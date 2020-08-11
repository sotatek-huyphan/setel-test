import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './core/event-module/event.module';

@Module({
  imports: [
    OrderModule,
    DatabaseModule,
    EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
