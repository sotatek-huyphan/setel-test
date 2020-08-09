import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, switchMap, delay } from 'rxjs/operators';
import { OrderRepository } from '../../order/repository/order.repository';
import { ConfirmOrderCommand } from '../command/impl/confirm-order.command';
import { DeclineOrderCommand } from '../command/impl/decline-order.command';
import { OrderConfirmedEvent } from './../event/impl/order-confirmed.event';
import { OrderCreatedEvent } from './../event/impl/order-created.event';
import { DeliveryOrderCommand } from '../command/impl/delivery-order.command';

@Injectable()
export class OrderSaga {
  constructor(private _orderRepository: OrderRepository) {}

  @Saga()
  createdOder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      switchMap(async (event: OrderCreatedEvent) => {
        const paymentValid = await this._orderRepository.verifyOrderPayment(
          event.product,
          event.amount,
          event.author,
        );
        if (paymentValid.isSuccess) {
          return new ConfirmOrderCommand(event.aggregateId, event.author);
        } else {
          return new DeclineOrderCommand(event.aggregateId);
        }
      }),
    );
  };

  @Saga()
  confirmedOder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderConfirmedEvent),
      delay(200000),
      map(
        (event: OrderConfirmedEvent) =>
          new DeliveryOrderCommand(event.aggregateId),
      ),
    );
  };
}
