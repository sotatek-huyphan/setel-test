import { OrderRepository } from './../../repository/order.repository';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { OrderAggregate } from '../models/order.aggregate';
import { DeclineOrderCommand } from '../impl/decline-order.command';

@CommandHandler(DeclineOrderCommand)
export class DeclineOrderCommandHandler
  implements ICommandHandler<DeclineOrderCommand> {
    constructor(
      private _orderRepository: OrderRepository,
      private _publisher: EventPublisher,
    ) {}

    async execute(command: DeclineOrderCommand): Promise<any> {
      const { orderId } = command;
      let orderAggregate = this._publisher.mergeObjectContext(
        await this._orderRepository.find(orderId)
      );

      orderAggregate.cancelOrder();
      orderAggregate.commit();
    }
}
