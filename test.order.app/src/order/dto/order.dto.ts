export interface OrderDTO {
  _id?: string;
  product: string;
  amount: number;
  user: string;
  state?: string;
}
