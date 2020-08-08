import { GetOrderQuery } from './../query/impl/order.query';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../command/impl/create-order.command';
import { OrderDTO } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  async createOrder(order: OrderDTO) {
    const orderCommand: CreateOrderCommand = new CreateOrderCommand(order.product, order.amount, order.user);
    return await this._commandBus.execute(orderCommand);
  }

  cancelOrder(id: string) {}

  async checkOrderStatus(id: string) {
    return await this.getOrder(id);
  }

  async getOrder(id: string): Promise<OrderDTO> {
    const getOrderQuery: GetOrderQuery = new GetOrderQuery(id);
    return await this._queryBus.execute(getOrderQuery);
  }
}
