import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { OrderRepository } from './../../repository/order.repository';
import { ConfirmOrderCommand } from '../impl/confirm-order.command';

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderCommandHandler
  implements ICommandHandler<ConfirmOrderCommand> {
  constructor(
    private _orderRepository: OrderRepository,
    private _publisher: EventPublisher,
  ) {}

  async execute(command: ConfirmOrderCommand): Promise<any> {
    const { orderId, author } = command;
    let orderAggregate = this._publisher.mergeObjectContext(
      await this._orderRepository.find(orderId)
    );

    orderAggregate.confirmOrder();
    orderAggregate.commit();
  }
}
