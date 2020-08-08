import { EVENT_STORE_PROVIDER } from './../../constant/app.constant';
import { Model } from 'mongoose';
import { EventDoc } from '../schemas/event.schema';
import * as uuid from 'uuid';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class EventStoreRepository {
  constructor(
    @Inject(EVENT_STORE_PROVIDER)
    protected readonly eventModel: Model<EventDoc>,
  ) {}

  public async AppendEvent(event: any) {
    const createdEvent = new this.eventModel({
      _id: this.getId(),
      aggregateId: event.aggregateId,
      type: event.constructor.name,
      data: event,
      version: event.version,
      createdDate: new Date(),
    });

    return createdEvent.save();
  }

  protected getId() {
    return uuid.v4();
  }
}
