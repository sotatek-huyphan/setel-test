import { OrderConfirmedEvent } from './../event/impl/order-confirmed.event';
import { OrderCreatedEvent } from './../event/impl/order-created.event';
import { OrderDeclinedEvent } from './../event/impl/order-declined.event';
import { OrderDeliveredEvent } from './../event/impl/order-delivered.event';
import { OrderState } from './order-state.enum';
import { OrderStateMachine } from './order-state.manager';

describe('OrderStateMachine', () => {

  const createdState = () => {
    let stateMachine = new OrderStateMachine();
    const orderCreatedEvent = new OrderCreatedEvent('', '', 0, '', 0, new Date());
    stateMachine.MoveNext(orderCreatedEvent);
    return stateMachine;
  }

  const confirmedState = () => {
    let stateMachine = createdState();
    const confirmedEvent = new OrderConfirmedEvent('', 0);
    stateMachine.MoveNext(confirmedEvent);
    return stateMachine;
  }

  const cancelledState = () => {
    let stateMachine = createdState();
    const cancelledEvent = new OrderDeclinedEvent('', 0);
    stateMachine.MoveNext(cancelledEvent);
    return stateMachine;
  }

  const deliveredState = () => {
    let stateMachine = confirmedState();
    const deliveredEvent = new OrderDeliveredEvent('', 0);
    stateMachine.MoveNext(deliveredEvent);
    return stateMachine;
  }

  describe('initial state', () => {
    it('should be created state', () => {
      let stateMachine = createdState();
      expect(stateMachine.GetCurrentState()).toBe(OrderState[OrderState.Created]);
    })
  })

  describe('given created state', () => {
    it('should confirm to confirmed state', () => {
      let stateMachine = confirmedState();
      expect(stateMachine.GetCurrentState()).toBe(OrderState[OrderState.Confirmed]);
    })
  })

  describe('given created state', () => {
    it('should cancel to cancelled state', () => {
      let stateMachine = cancelledState();
      expect(stateMachine.GetCurrentState()).toBe(OrderState[OrderState.Cancelled]);
    })
  })

  describe('given confirmed state', () => {
    it('should deliver to delivered state', () => {
      let stateMachine = deliveredState();
      expect(stateMachine.GetCurrentState()).toBe(OrderState[OrderState.Delivered]);
    })
  })
});
