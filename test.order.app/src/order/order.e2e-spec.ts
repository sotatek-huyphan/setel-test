import { PAYMENT_SERVICE } from '../core/constant/app.constant';
import { EventModule } from '../core/event-module/event.module';
import { TestDatabaseModule } from '../__test/test.database.module';
import { DatabaseModule } from '../database/database.module';
import { OrderModule } from './order.module';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { of } from 'rxjs';

let app: INestApplication;

const paymentFake = {
  send: (obj) => of({ isSuccess: true })
}

describe('order', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderModule, EventModule],
    })
      .overrideProvider(DatabaseModule)
      .useValue(TestDatabaseModule)
      .overrideProvider(PAYMENT_SERVICE)
      .useValue(paymentFake)
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

  it(`/Get order`, () => {
    const createOrder = {
      "product": "IPhone",
      "amount": 6,
      "user": "Phan QUang Huy"
    };
    return request(app.getHttpServer())
      .get('/orders')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
})
