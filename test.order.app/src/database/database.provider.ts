import { DB_PROVIDER, AppSetting } from './../core/constant/app.constant';

import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(AppSetting.MongoDb.ConnectionString);
        },
    },
];
