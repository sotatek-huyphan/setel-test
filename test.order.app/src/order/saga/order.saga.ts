import { OrderCreatedEvent } from './../event/impl/order-created.event';
import { OrderRepository } from '../../order/repository/order.repository';
import { ConfirmOrderCommand, DeclineOrderCommand, DeliveryOrderCommand } from '../command/impl/create-order.command';
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Injectable()
export class OrderSaga {
  constructor(private _orderRepository: OrderRepository) {}

  @Saga()
  confirmedOder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      switchMap(
        async (event: OrderCreatedEvent) =>
          {
            const paymentValid = await this._orderRepository.verifyOrderPayment(event.product, event.amount);
            if (paymentValid.isSuccess) {
              return new ConfirmOrderCommand(event.aggregateId, event.author);
            } else {
              return new DeclineOrderCommand(event.aggregateId, event.author);
            }
          }
      ),
    );
  };


  // @Saga()
  // confirmedOder = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(OrderPaymentConfirmedEvent),
  //     map(
  //       (event: OrderPaymentConfirmedEvent) =>
  //         new ConfirmOrderCommand(event.orderId, event.orderId),
  //     ),
  //   );
  // };

  // @Saga()
  // declinedOrder = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(OrderPaymentDeclinedEvent),
  //     map(
  //       (event: OrderPaymentDeclinedEvent) =>
  //         new DeclineOrderCommand(event.orderId, event.author),
  //     ),
  //   );
  // };

  // @Saga()
  // deliveredOrder = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(StartOrderDeliveryEvent),
  //     delay(3000),
  //     map(
  //       (event: StartOrderDeliveryEvent) =>
  //         new DeliveryOrderCommand(event.orderId),
  //     ),
  //   );
  // };
}
