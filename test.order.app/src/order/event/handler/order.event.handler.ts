import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderRepository } from './../../repository/order.repository';
import { OrderCreatedEvent } from './../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    private _orderRepository: OrderRepository,
  ) {}

  // create read model
  async handle(event: OrderCreatedEvent) {
    this.saveReadModel(event);
  }

  private saveReadModel(event: OrderCreatedEvent) {
  }
}
