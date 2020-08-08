import { BaseDomainEvent } from './../../../core/models/base-domain.event';
import { OrderEvent } from './../../utilities/order-event.enum';
import { ITransitionEvent } from '../../../core/interfaces/transition-event.interface';

export class OrderConfirmedEvent extends BaseDomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly version: number,
  ) {
    super(aggregateId, version);
  }
}
