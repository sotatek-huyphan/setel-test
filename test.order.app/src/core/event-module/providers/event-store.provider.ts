import { EVENT_STORE_PROVIDER, DB_PROVIDER } from '../../constant/app.constant';
import { Connection } from 'mongoose';
import { EventSchema } from '../schemas/event.schema';

export const eventStoreProviders = [
  {
    provide: EVENT_STORE_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('EventStore', EventSchema),
    inject: [DB_PROVIDER],
  },
];
