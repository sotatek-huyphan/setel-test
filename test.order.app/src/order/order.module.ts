
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './../database/database.module';
import { ConfirmOrderCommandHandler } from './command/handler/confirm-order.command.handler';
import { DeclineOrderCommandHandler } from './command/handler/decline-order.command.handler';
import { DeliveryOrderCommandHandler } from './command/handler/delivery-order.command.handller';
import { CreateOrderCommandHandler } from './command/handler/create-order.command.handler';
import { OrderConfirmedEventHandler } from './event/handler/order.confirmed.event.handler';
import { OrderDeclinedEventHandler } from './event/handler/order.declined.event.handler';
import { OderDeliveredEventHandler } from './event/handler/order.delivered.event.handler';
import { OrderCreatedHandler } from './event/handler/order.event.handler';
import { OrderController } from './order.controller';
import { GetOrderQueryHandler } from './query/handler/get-order.query.handler';
import { OrderRepository } from './repository/order.repository';
import { OrderSaga } from './saga/order.saga';
import { orderProviders } from './schema/order.provider';
import { OrderService } from './service/order.service';
import { AppEventPublisher } from '../core/event-module/event-publisher/event.publisher';
import { ListOrderQueryHandler } from './query/handler/list-order.query.handler';

export const CommandHandlers = [
  CreateOrderCommandHandler,
  ConfirmOrderCommandHandler,
  DeclineOrderCommandHandler,
  DeliveryOrderCommandHandler,
];
export const EventHandlers = [
  OrderCreatedHandler,
  OrderConfirmedEventHandler,
  OrderDeclinedEventHandler,
  OderDeliveredEventHandler,
];
const QueryHandlers = [GetOrderQueryHandler, ListOrderQueryHandler];

@Module({
  imports: [
    CqrsModule,
    OrderModule,
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ])
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...orderProviders,
    OrderRepository,
    OrderSaga,
    AppEventPublisher
  ],
})
export class OrderModule implements OnModuleInit {
  constructor(
    private readonly _event$: EventBus,
    private readonly _eventPublisher: AppEventPublisher,
  ) {}

  onModuleInit() {
    /*
    NestJS allows us to run custom logic on module load using the onModuleInit hook.
    This is a chance to do general assignments, depending on our EventStore implementation,
    such as connecting the Event Store to the Event Bus.
  */

    this._eventPublisher.bridgeEventsTo((this._event$ as any).subject$);
    this._event$.publisher = this._eventPublisher;
  }
}
