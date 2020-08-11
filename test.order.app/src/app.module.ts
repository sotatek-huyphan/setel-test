import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './core/event-module/event.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration]
    }),
    OrderModule,
    DatabaseModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
