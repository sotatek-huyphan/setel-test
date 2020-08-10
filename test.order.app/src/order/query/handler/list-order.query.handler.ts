import { ListOrderQuery } from './../impl/list-order.query';
import { OrderRepository } from './../../repository/order.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderDTO } from '../../dto/order.dto';

@QueryHandler(ListOrderQuery)
export class ListOrderQueryHandler implements IQueryHandler<ListOrderQuery> {
  constructor(private _orderRepository: OrderRepository) { }

  async execute(query: ListOrderQuery): Promise<any> {
    const orders = await this._orderRepository.list();
    const result = orders.map(order => ({
      _id: order.id,
      product: order.getProduct(),
      amount: order.getAmount(),
      user: order.getAuthor(),
      state: order.getState(),
      createdDate: order.getCreatedDate()
    }));

    return result;
  }
}
