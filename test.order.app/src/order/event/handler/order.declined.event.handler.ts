
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { OrderDeclinedEvent } from '../impl/order-declined.event';

@EventsHandler(OrderDeclinedEvent)
export class OrderDeclinedEventHandler implements IEventHandler<OrderDeclinedEvent> {
  constructor(
  ) {}

  // create read model
  async handle(event: OrderDeclinedEvent) {
  }
}
