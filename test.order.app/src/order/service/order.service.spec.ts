import { CommandBus, QueryBus, IQuery } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, CommandBus, QueryBus],
    }).compile();

    service = module.get<OrderService>(OrderService);
    expect(service).toBeDefined();
  });

  describe('query list order', () => {
    let orderService: OrderService;
    let queryBus: QueryBus;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          CommandBus,
          {
            provide: QueryBus,
            useClass: QueryBusFake
          }
        ]
      }).compile();
      orderService = module.get(OrderService);
      queryBus = module.get(QueryBus);
    })

    it('should execute query bus with correct parameter', async () => {
      const queryBusSpy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValue(mockListOrder);

      const result = await orderService.listOrder();

      expect(queryBusSpy).toHaveBeenCalled();
      expect(result).toEqual(mockListOrder.reverse());
    })
  })

});


const mockListOrder = [
  {
    _id: "9a63e156-2752-4a29-805b-5ccaa0690344",
    product: "IPhone",
    amount: 6,
    user: "Phan QUang Huy",
    state: "Cancelled",
    createdDate: new Date()
  },
  {
    _id: "f64f0786-2e4b-4bfd-a028-6a5e20ebd2b3",
    product: "IPhone",
    amount: 6,
    user: "Phan QUang Huy",
    state: "Cancelled",
    createdDate: new Date()
  }, {
    _id: "9a63e156-2752-4a29-805b-5ccaa0690344",
    product: "IPhone",
    amount: 6,
    user: "Phan QUang Huy",
    state: "Cancelled",
    createdDate: new Date()
  },
  {
    _id: "f64f0786-2e4b-4bfd-a028-6a5e20ebd2b3",
    product: "IPhone",
    amount: 6,
    user: "Phan QUang Huy",
    state: "Cancelled",
    createdDate: new Date()
  },
];
class QueryBusFake {
  public async execute(query): Promise<void> {
  };
}
