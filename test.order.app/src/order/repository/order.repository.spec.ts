import { ClientProxy } from '@nestjs/microservices';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { EVENT_STORE_PROVIDER, PAYMENT_SERVICE } from './../../core/constant/app.constant';
import { EventDoc } from './../../core/event-module/schemas/event.schema';
import { OrderRepository } from './order.repository';
import { of } from 'rxjs';
import { exec } from 'child_process';
// import { DatabaseModule } from 'src/database/database.module';

describe('OrderRepository', () => {
  let orderRepository: OrderRepository;
  let monGooseModel: Model<EventDoc>;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      {
        providers: [
          OrderRepository,
          {
            provide: EVENT_STORE_PROVIDER,
            useClass: ModelEventDocFake
          },
          {
            provide: PAYMENT_SERVICE,
            useFactory: () => ({
              send: jest.fn((obj) => of({ isSuccess: true }))
            })
          },
        ]
      }
    ).compile();
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  // describe('find', () => {
  it('find should return the right aggregate', async () => {
    const result = await orderRepository.find(aggregateId);
    expect(result).toBeDefined();
    expect(result.id).toBe(aggregateId);
    expect(result.getAmount()).toBe(6);
    expect(result.getState()).toBe('Cancelled');
    expect(result.getProduct()).toBe('IPhone');
  })
  // });
})

const aggregateId = '9a63e156-2752-4a29-805b-5ccaa0690344';

const eventStoreMock = [
  {
    _id: 'ea8a3909-0a63-4c5b-80f6-dcdc47ff487e',
    aggregateId: '9a63e156-2752-4a29-805b-5ccaa0690344',
    type: 'OrderCreatedEvent',
    data: {
      aggregateId: '9a63e156-2752-4a29-805b-5ccaa0690344',
      version: 1,
      product: 'IPhone',
      amount: 6,
      author: 'Phan QUang Huy',
      createdDate: new Date()
    },
    version: 1,
    __v: 0
  }
  , {
    _id: 'a5d93226-129d-457f-b064-eb57fc3abc32',
    aggregateId: '9a63e156-2752-4a29-805b-5ccaa0690344',
    type: 'OrderDeclinedEvent',
    data: {
      aggregateId: '9a63e156-2752-4a29-805b-5ccaa0690344',
      version: 2
    },
    version: 2,
    __v: 0
  }];

class ExecResult {
  constructor(private data?: any) { }

  public exec() {
    return this.data;
  }
}

class ModelEventDocFake {

  constructor(public data?: any) { }

  public save() {
    return this.data;
  }

  public find() {
    return new ExecResult(eventStoreMock);
  }
}
