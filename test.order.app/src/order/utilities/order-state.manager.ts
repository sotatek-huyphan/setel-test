import { ITransitionEvent } from '../../core/interfaces/transition-event.interface';
import { UnprocessableEntityException } from '../../core/exceptions/unprocessable-entity.exception';
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
    this.addTransition(OrderState.Created, OrderEvent.OrderDeclinedEvent, OrderState.Cancelled);
    this.addTransition(OrderState.Confirmed, OrderEvent.OrderDeliveredEvent, OrderState.Delivered);
    this.addTransition(OrderState.Confirmed, OrderEvent.OrderDeclinedEvent, OrderState.Cancelled);
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
    if (this._currentState == null) throw new UnprocessableEntityException();
    return OrderState[this._currentState];
  }

  public GetCurrentState() {
    return OrderState[this._currentState];
  }
}
