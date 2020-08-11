export default () => ({
  port: parseInt(process.env.PORT, 10) || 9869,
  database: {
    connectionString: process.env.MONGO_CONNECTION_STRING
  },
  services: {
    paymentService: {
      host: process.env.PAYMENT_SERVICE_HOST,
      port: parseInt(process.env.PAYMENT_SERVICE_PORT, 10) || 8888,
    }
  },
  process: {
    deliveryDelay: parseInt(process.env.PROCESS_DELIVERY_DELAY, 10) || 20000
  }
});
