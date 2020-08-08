import { IEvent } from '@nestjs/cqrs';
import { ITransitionEvent } from "../interfaces/transition-event.interface";

export class BaseDomainEvent implements ITransitionEvent, IEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly version: number
  ) {}
}
