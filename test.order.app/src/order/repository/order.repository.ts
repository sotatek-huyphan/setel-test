import { OrderDeliveredEvent } from './../event/impl/order-delivered.event';
import { OrderDeclinedEvent } from './../event/impl/order-declined.event';
import { OrderConfirmedEvent } from './../event/impl/order-confirmed.event';
import { EventStoreRepository } from './../../core/event-module/repositories/event-store.repository';
import { EventDoc } from './../../core/event-module/schemas/event.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { EVENT_STORE_PROVIDER } from '../../core/constant/app.constant';
import { OrderAggregate } from '../command/models/order.aggregate';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentVerifyDTO } from '../dto/payment-verify.dto';
import { OrderCreatedEvent } from '../event/impl/order-created.event';

@Injectable()
export class OrderRepository extends EventStoreRepository {
  constructor(
    @Inject(EVENT_STORE_PROVIDER)
    protected readonly eventModel: Model<EventDoc>,
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy,
  ) {
    super(eventModel);
  }

  public async createOrder(product: string, amount: number, author: string) {
    const order = new OrderAggregate(this.getId());
    order.createOrder({ product, amount, author });
    return order;
  }

  public async verifyOrderPayment(product: string, amount: number) {
    const pattern = { cmd: 'payment' };
    const payload: PaymentVerifyDTO = {
      PIN: '8asdj12kkasd',
      product: product,
      amount: amount,
    };
    const rs = await this.client.send(pattern, payload).toPromise();
    return rs;
  }

  public async Rehydrate(aggregateId: string) {
    const eventDocs = await this.eventModel
      .find({ aggregateId: aggregateId })
      .exec();
    const aggregateModel: OrderAggregate = new OrderAggregate(aggregateId);
    aggregateModel.loadFromHistory(eventDocs.map(x => this.mapDocEvent(x)));
    return aggregateModel;
  }

  private mapDocEvent(x: EventDoc): any {
    const obj = x.data;
    switch (x.type) {
      case 'OrderCreatedEvent':
        return new OrderCreatedEvent(
          obj.aggregateId,
          obj.product,
          obj.amount,
          obj.author,
          obj.version,
        );
      case 'OrderConfirmedEvent':
        return new OrderConfirmedEvent(obj.aggregateId, obj.version);
      case 'OrderDeclinedEvent':
        return new OrderDeclinedEvent(obj.aggregateId, obj.version);
      case 'OrderDeliveredEvent':
        return new OrderDeliveredEvent(obj.aggregateId, obj.version);
      default:
        return null;
    }
  }
}
