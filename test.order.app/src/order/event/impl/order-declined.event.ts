import { BaseDomainEvent } from './../../../core/models/base-domain.event';

export class OrderDeclinedEvent extends BaseDomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly version: number,
  ) {
    super(aggregateId, version);
  }
}
