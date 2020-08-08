import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventStore extends Document {
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
}

export const EventStoreSchema = SchemaFactory.createForClass(EventStore);
