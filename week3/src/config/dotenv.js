import { config } from 'dotenv';
import { resolve } from 'path';

const env = process.env.NODE_ENV ?? 'development';

config({
  path: resolve(process.cwd(), `.env.${env}`),
});
