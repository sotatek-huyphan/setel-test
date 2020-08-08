import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateOrderCommandHandler } from './order/command/handler/create-order.command.handler';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './core/event-module/event.module';

export const CommandHandlers = [CreateOrderCommandHandler];
export const EventHandlers = [];
@Module({
  imports: [
    OrderModule,
    DatabaseModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // OrderService,
    // ...CommandHandlers,
    // ...EventHandlers,
    // OrderRepository,
  ],
})
export class AppModule {}
