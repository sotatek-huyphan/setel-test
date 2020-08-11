import { DB_PROVIDER } from './../core/constant/app.constant';
import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let  mongod: MongoMemoryServer = null;

const memoryDatabaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async () => {
      mongod = new MongoMemoryServer();
      const uri = await mongod.getConnectionString();
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(uri);
    },
  },
];

export const closeMongooseMemory = async () => {
  if (mongod) await mongod.stop();
}

@Module({
  providers: [...memoryDatabaseProviders],
  exports: [...memoryDatabaseProviders],
})
export class TestDatabaseModule { }
