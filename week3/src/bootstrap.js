import { createApp } from './app.js';
import { Database } from './database.js';

export function bootstrap() {
  const app = createApp();
  const database = new Database();

  database.setup();

  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
}
