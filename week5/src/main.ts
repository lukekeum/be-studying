import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Database } from './database';

async function bootstrap() {
  const database = new Database();

  database.setup();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
