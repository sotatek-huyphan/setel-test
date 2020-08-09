export class ConfirmOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly author: string,
  ) {}
}
