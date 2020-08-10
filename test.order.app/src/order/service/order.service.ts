import { ListOrderQuery } from './../query/impl/list-order.query';
import { DeclineOrderCommand } from './../command/impl/decline-order.command';
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
  ) { }

  async createOrder(order: OrderDTO) {
    const orderCommand: CreateOrderCommand = new CreateOrderCommand(order.product, order.amount, order.user);
    return await this._commandBus.execute(orderCommand);
  }

  async cancelOrder(id: string) {
    const cancelCommand: DeclineOrderCommand = new DeclineOrderCommand(id);
    return await this._commandBus.execute(cancelCommand);
  }

  async checkOrderStatus(id: string) {
    return await this.getOrder(id);
  }

  async getOrder(id: string): Promise<OrderDTO> {
    const getOrderQuery: GetOrderQuery = new GetOrderQuery(id);
    return await this._queryBus.execute(getOrderQuery);
  }

  async listOrder(): Promise<any[]> {
    const listOrderQuery: ListOrderQuery = new ListOrderQuery();
    const rs = await this._queryBus.execute(listOrderQuery) as any[];
    return rs.sort((a, b) => {
      return b.createdDate.getTime() - a.createdDate.getTime();
    });
  }
}
