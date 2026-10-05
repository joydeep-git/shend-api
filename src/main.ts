import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors(process.env.FRONTEND!);

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT!);

}

bootstrap();
