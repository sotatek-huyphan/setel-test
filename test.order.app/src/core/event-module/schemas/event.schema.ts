import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventDoc extends Document {
  @Prop()
  _id: string;

  @Prop()
  type: string;

  @Prop()
  aggregateId: string;

  @Prop()
  data: any;

  @Prop()
  timestamp: Date;

  @Prop()
  author: string;

  @Prop()
  version: number;
}

export const EventSchema = SchemaFactory.createForClass(EventDoc);
