import { ConcurrencyException } from './../../../core/exceptions/concurrency.exception';
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

  public createOrder({ product, amount, author }) {
    const event = new OrderCreatedEvent(
      this.id,
      product,
      amount,
      author,
      this.version + 1,
    );
    this.apply(event);
  }

  public confirmOrder() {
    const event = new OrderConfirmedEvent(this.id, this.version + 1);
    this.apply(event);
  }

  public cancelOrder() {
    const event = new OrderDeclinedEvent(this.id, this.version + 1);
    this.apply(event);
  }

  public deliveryOrder() {
    const event = new OrderDeliveredEvent(this.id, this.version + 1);
    this.apply(event);
  }

  public onOrderCreatedEvent(event: OrderCreatedEvent) {
    this._state = this._stateMachine.MoveNext(event);
    const { product, amount, author, version } = event;
    this._product = product;
    this._amount = amount;
    this._author = author;

    if (this.validateVersion(this.version, version)) {
      this.version = version;
    } else {
      throw new ConcurrencyException();
    }
  }

  public onOrderConfirmedEvent(event: OrderConfirmedEvent) {
    this._state = this._stateMachine.MoveNext(event);

    if (this.validateVersion(this.version, event.version)) {
      this.version = event.version;
    } else {
      throw new ConcurrencyException();
    }
  }

  public onOrderDeclinedEvent(event: OrderDeclinedEvent) {
    this._state = this._stateMachine.MoveNext(event);

    if (this.validateVersion(this.version, event.version)) {
      this.version = event.version;
    } else {
      throw new ConcurrencyException();
    }
  }

  public onOrderDeliveredEvent(event: OrderDeliveredEvent) {
    this._state = this._stateMachine.MoveNext(event);

    if (this.validateVersion(this.version, event.version)) {
      this.version = event.version;
    } else {
      throw new ConcurrencyException();
    }
  }

  validateVersion(currentVersion: number, nexVersion: number) {
    return (nexVersion - currentVersion == 1);
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
