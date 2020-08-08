import { AggregateRoot } from '@nestjs/cqrs';

export abstract class BaseAggregateRoot extends AggregateRoot {
  protected version = 0;

  constructor(public readonly id) {
    super();
  }
}
