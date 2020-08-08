import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { IEventPublisher } from '@nestjs/cqrs/dist/interfaces/events/event-publisher.interface';
import { IMessageSource } from '@nestjs/cqrs/dist/interfaces/events/message-source.interface';
import { Subject } from 'rxjs';
import { EventStoreRepository } from './../repositories/event-store.repository';

@Injectable()
export class AppEventPublisher implements IEventPublisher, IMessageSource {
  private subject$: any;

  constructor(
    private _eventStoreRepository: EventStoreRepository,
  ) {}

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    this.subject$ = subject;
  }

  async publish<T extends IEvent = IEvent>(event: T) {
    await this._eventStoreRepository.AppendEvent(event);
    this.subject$.next(event);
  }
}
