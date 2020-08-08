import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  _id: string;

  @Prop()
  product: string;

  @Prop()
  amount: number;

  @Prop()
  state: string;

  @Prop()
  user: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
