import { OrderRepository } from './../../repository/order.repository';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeliveryOrderCommand } from '../impl/delivery-order.command';

@CommandHandler(DeliveryOrderCommand)
export class DeliveryOrderCommandHandler
  implements ICommandHandler<DeliveryOrderCommand> {
    constructor(
      private _orderRepository: OrderRepository,
      private _publisher: EventPublisher,
    ) {}

    async execute(command: DeliveryOrderCommand): Promise<any> {
      const { orderId } = command;
      let orderAggregate = this._publisher.mergeObjectContext(
        await this._orderRepository.Rehydrate(orderId)
      );

      orderAggregate.deliveryOrder();
      orderAggregate.commit();
    }
}
