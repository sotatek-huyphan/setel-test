export class DeclineOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly author: string,
  ) {}
}