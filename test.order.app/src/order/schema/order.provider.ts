import { ORDER_MODEL_PROVIDER, DB_PROVIDER } from './../../core/constant/app.constant';
import { OrderSchema } from './order.schema';
import { Connection } from "mongoose";
export const orderProviders = [
  {
      provide: ORDER_MODEL_PROVIDER,
      useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
      inject: [DB_PROVIDER],
  },
];
