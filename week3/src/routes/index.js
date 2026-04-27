import { Router } from 'express';
import { restaurantRouter } from '../modules/index.js';

export const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello World');
});

rootRouter.use('/restaurant', restaurantRouter);
