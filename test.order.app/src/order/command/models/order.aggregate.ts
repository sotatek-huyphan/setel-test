import { BaseAggregateRoot } from '../../../core/models/base-aggregate-root';
import { OrderConfirmedEvent } from './../../event/impl/order-confirmed.event';
import { OrderCreatedEvent } from './../../event/impl/order-created.event';
import { OrderDeclinedEvent } from './../../event/impl/order-declined.event';
import { OrderDeliveredEvent } from './../../event/impl/order-delivered.event';
import { OrderStateMachine } from './../../utilities/order-state.manager';

export class OrderAggregate extends BaseAggregateRoot {
  private _state: string;
  private _product: string;
  private _amount: number;
  private _author: string;

  private readonly _stateMachine: OrderStateMachine;

  constructor(public readonly id: string) {
    super(id);
    this._stateMachine = new OrderStateMachine();
  }

  setData({ product, amount, author }) {
    this._product = product;
    this._amount = amount;
    this._author = author;
  }

  public createOrder() {
    ++ this.version;
    this.apply(new OrderCreatedEvent(this.id, this._product, this._amount, this._author, this.version));
  }

  public confirmOrder() {
    ++ this.version;
    this.apply(new OrderConfirmedEvent(this.id, this.version));
  }

  public cancelOrder() {
    ++ this.version;
    this.apply(new OrderDeclinedEvent(this.id, this.version));
  }

  public deliveryOrder() {
    ++ this.version;
    this.apply(new OrderDeliveredEvent(this.id, this.version));
  }

  public onOrderCreatedEvent(event: OrderCreatedEvent) {
    this._state = this._stateMachine.MoveNext(event);
    const { product, amount, author, version } = event;
    this._product = product;
    this._amount = amount;
    this._author = author;
    this.version = version;
  }

  public onOrderConfirmedEvent(event: OrderCreatedEvent) {
    this._state = this._stateMachine.MoveNext(event);
    ++ this.version;
  }

  public onOrderDeclinedEvent(event: OrderCreatedEvent) {
    this._state = this._stateMachine.MoveNext(event);
    ++ this.version;
  }

  public onOrderDeliveredEvent(event: OrderCreatedEvent) {
    this._state = this._stateMachine.MoveNext(event);
    ++ this.version;
  }

  getProduct() {
    return this._product;
  }

  getAmount() {
    return this._amount;
  }

  getState() {
    return this._state;
  }

  getAuthor() {
    return this._author;
  }
}
