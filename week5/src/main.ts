import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Database } from './common/database';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const database = new Database();

  database.setup();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
