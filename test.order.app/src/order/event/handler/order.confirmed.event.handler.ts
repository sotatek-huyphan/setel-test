import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { OrderConfirmedEvent } from '../impl/order-confirmed.event';

@EventsHandler(OrderConfirmedEvent)
export class OrderConfirmedEventHandler implements IEventHandler<OrderConfirmedEvent> {
  constructor(
  ) {}

  // create read model
  async handle(event: OrderConfirmedEvent) {
    // const { orderId,  state} = event;
  }
}
