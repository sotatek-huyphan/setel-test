import { DB_PROVIDER } from './../core/constant/app.constant';

import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost:27017/orderdb');
        },
    },
];
