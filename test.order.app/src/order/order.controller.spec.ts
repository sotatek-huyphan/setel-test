import { OrderService } from './service/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('Order Controller', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, CommandBus, QueryBus]
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
