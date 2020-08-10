
export const AppSetting = {
  AppPort: 9869,
  PaymentService: {
    Name: 'PAYMENT_SERVICE',
    Host: '127.0.0.1',
    Port: 8888
  },
  MongoDb: {
    ConnectionString: 'mongodb://localhost:27017/orderdb',
  }
}

export const appErrors = {
  invalidArgument: 'Invalid argument'
}

export const DB_PROVIDER = 'DbConnectionToken';

export const EVENT_STORE_PROVIDER = 'EventStoreToken';

export const ORDER_MODEL_PROVIDER = 'OrderModelToken';

export const PAYMENT_SERVICE = 'PAYMENT_SERVICE';
