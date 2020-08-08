import { OrderRepository } from './../../repository/order.repository';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { DeclineOrderCommand } from '../impl/create-order.command';
import { OrderAggregate } from '../models/order.aggregate';

@CommandHandler(DeclineOrderCommand)
export class DeclineOrderCommandHandler
  implements ICommandHandler<DeclineOrderCommand> {
    constructor(
      private _orderRepository: OrderRepository,
      private _publisher: EventPublisher,
    ) {}

    async execute(command: DeclineOrderCommand): Promise<any> {
      const { orderId, author } = command;
      let orderAggregate = this._publisher.mergeObjectContext(
        await this._orderRepository.Rehydrate(orderId)
      );

      orderAggregate.cancelOrder();
      orderAggregate.commit();
    }
}
