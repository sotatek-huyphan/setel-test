import { OrderRepository } from '../../repository/order.repository';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    const { product, amount, author } = command;
    const orderAggregate = this._publisher.mergeObjectContext(
      await this._orderRepository.createOrder(product, amount, author),
    );
    orderAggregate.commit();
    return orderAggregate.id;
  }
}
