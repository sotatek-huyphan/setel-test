import { DB_PROVIDER } from './../core/constant/app.constant';
import * as mongoose from 'mongoose';
import configuration from '../config/configuration';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(configuration().database.connectionString);
        },
    },
];
