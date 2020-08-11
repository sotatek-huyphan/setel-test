import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import * as request from 'supertest';
import { TestDatabaseModule, closeMongooseMemory } from '../__test/test.database.module';
import { AppEventPublisher } from './../core/event-module/event-publisher/event.publisher';
import { eventStoreProviders } from './../core/event-module/providers/event-store.provider';
import { EventStoreRepository } from './../core/event-module/repositories/event-store.repository';
import { OrderController } from './order.controller';
import { CommandHandlers, EventHandlers } from './order.module';
import { GetOrderQueryHandler } from './query/handler/get-order.query.handler';
import { ListOrderQueryHandler } from './query/handler/list-order.query.handler';
import { OrderRepository } from './repository/order.repository';
import { OrderSaga } from './saga/order.saga';
import { orderProviders } from './schema/order.provider';
import { OrderService } from './service/order.service';

let app: INestApplication;

const paymentFake = {
  send: (obj) => of({ isSuccess: true })
}

const QueryHandlers = [GetOrderQueryHandler, ListOrderQueryHandler];

describe('order', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CqrsModule,
        TestDatabaseModule,
        // EventModule
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
        AppEventPublisher,
        {
          provide: 'PAYMENT_SERVICE',
          useFactory: () => ({
            send: jest.fn((obj) => of({ isSuccess: true }))
          })
        },
        ...eventStoreProviders,
        EventStoreRepository
      ]
    })
      .compile();

    app = await moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post order`, () => {
    const createOrder = {
      "product": "IPhone",
      "amount": 6,
      "user": "Phan QUang Huy"
    };
    return request(app.getHttpServer())
      .post('/order')
      .send(createOrder)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
})
