import { BaseDomainEvent } from './../../../core/models/base-domain.event';
import { OrderEvent } from './../../utilities/order-event.enum';

export class OrderCreatedEvent extends BaseDomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly product: string,
    public readonly amount: number,
    public readonly author: string,
    public readonly version: number,
  ) {
    super(aggregateId, version);
  }
}
