import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppSetting } from './core/constant/app.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(AppSetting.AppPort);
}
bootstrap();
