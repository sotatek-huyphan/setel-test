import { OrderRepository } from './../../repository/order.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../impl/order.query';
import { OrderDTO } from '../../dto/order.dto';

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private _orderRepository: OrderRepository) {}

  async execute(query: GetOrderQuery): Promise<any> {
    const id  = query.id;
    const order = await this._orderRepository.Rehydrate(id);
    const orderDTO: OrderDTO = {
      _id: order.id,
      product: order.getProduct(),
      amount: order.getAmount(),
      user: order.getAuthor(),
      state: order.getState()
    };
    return orderDTO;
  }
}
