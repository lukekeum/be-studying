import { createApp } from './app';

export async function bootstrap() {
  const app = createApp();
  const database = new Database();

  await database.setup();

  app.listen(app.get('port'));
}
