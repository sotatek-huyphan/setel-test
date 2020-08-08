import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderDeliveredEvent } from '../impl/order-delivered.event';
import { OrderRepository } from './../../repository/order.repository';

@EventsHandler(OrderDeliveredEvent)
export class OderDeliveredEventHandler implements IEventHandler<OrderDeliveredEvent> {
  constructor(
    private _orderRepository: OrderRepository,
  ) {}

  // update read model
  async handle(event: OrderDeliveredEvent) {
  }
}
