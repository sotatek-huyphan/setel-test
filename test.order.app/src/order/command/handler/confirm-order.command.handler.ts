import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ConfirmOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from './../../repository/order.repository';

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
      await this._orderRepository.Rehydrate(orderId)
    );

    orderAggregate.confirmOrder();
    orderAggregate.commit();
  }
}
