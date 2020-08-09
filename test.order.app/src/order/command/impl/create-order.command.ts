export class CreateOrderCommand {
  constructor(
    public readonly product: string,
    public readonly amount: number,
    public readonly author: string,
  ) {}
}
