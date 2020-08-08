import { EventStoreRepository } from './repositories/event-store.repository';
import { DatabaseModule } from './../../database/database.module';
import { eventStoreProviders } from './providers/event-store.provider';
import { Module, Global } from '@nestjs/common';
import { AppEventPublisher } from './event-publisher/event.publisher';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [...eventStoreProviders, AppEventPublisher, EventStoreRepository],
  exports: [...eventStoreProviders, AppEventPublisher, EventStoreRepository],
})
export class EventModule {}
