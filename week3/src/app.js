import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { rootRouter } from './routes/index.js';

export function createApp() {
  const app = express();

  app.set('port', process.env.PORT ?? 3000);

  app.use(express.json());
  app.use(cors({ origin: true, credentials: true }));
  app.use(morgan());

  app.use('/', rootRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}
