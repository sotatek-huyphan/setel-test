import { ITransitionEvent } from '../../core/interfaces/transition-event.interface';
import { OrderEvent } from './order-event.enum';
import { OrderState } from "./order-state.enum";

class StateTransition {
  constructor(public readonly state: OrderState,public readonly event: number) {
  }

  public toString() {
    return JSON.stringify(this);
  }
}

export class OrderStateMachine {
  protected _currentState: OrderState;
  protected _transitions = {};

  constructor() {
    this.addTransition(undefined, OrderEvent.OrderCreatedEvent, OrderState.Created);
    this.addTransition(OrderState.Created, OrderEvent.OrderConfirmedEvent, OrderState.Confirmed);
    this.addTransition(OrderState.Created, OrderEvent.OrderDeclinedEvent, OrderState.Declined);
    this.addTransition(OrderState.Confirmed, OrderEvent.OrderDeliveredEvent, OrderState.Delivered);
  }

  private addTransition(state: OrderState, event: number, result: OrderState) {
    const stateTransition = new StateTransition(state, event);
    this._transitions[stateTransition.toString()] = result;
  }

  private GetNext(event: ITransitionEvent): OrderState {
    const stateTransition = new StateTransition(this._currentState, OrderEvent[event.constructor.name]);
    return this._transitions[stateTransition.toString()];
  }

  public MoveNext(event: ITransitionEvent) {
    this._currentState = this.GetNext(event);
    if (this._currentState == null) throw new Error('Invalid transition');
    return OrderState[this._currentState];
  }
}
