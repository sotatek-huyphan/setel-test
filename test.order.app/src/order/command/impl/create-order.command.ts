import { OrderDTO } from "src/order/dto/order.dto";


export class CreateOrderCommand {
  constructor(public readonly product: string, public readonly amount:number, public readonly author: string) {}
}

export class CancelOrderCommand {
  constructor(public readonly orderId: string, public readonly author: string) {}
}

export class ConfirmOrderCommand {
  constructor(public readonly orderId: string, public readonly author: string) {}
}

export class DeclineOrderCommand {
  constructor(public readonly orderId: string, public readonly author: string) {}
}

export class DeliveryOrderCommand {
  constructor(public readonly orderId: string) {}
}
