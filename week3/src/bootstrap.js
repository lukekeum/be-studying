import { createApp } from './app.js';
import { Database } from './database.js';

export async function bootstrap() {
  const app = createApp();
  const database = new Database();

  await database.setup();

  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
}
