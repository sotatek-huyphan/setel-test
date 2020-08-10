import { BaseDomainEvent } from './../../../core/models/base-domain.event';

export class OrderCreatedEvent extends BaseDomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly product: string,
    public readonly amount: number,
    public readonly author: string,
    public readonly version: number,
    public readonly createdDate: Date,
  ) {
    super(aggregateId, version);
  }
}
