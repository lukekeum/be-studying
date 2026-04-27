import { Router } from 'express';
import { RestaurantController } from './restaurant.controller.js';
import { RestaurantService } from './restaurant.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const restaurantRouter = Router();

const service = new RestaurantService();
const controller = new RestaurantController(service);

restaurantRouter.get(
  '/',
  asyncHandler(controller.getRestaurants.bind(controller)),
);
restaurantRouter.post(
  '/',
  asyncHandler(controller.createRestaurant.bind(controller)),
);
restaurantRouter.put(
  '/:id',
  asyncHandler(controller.updateRestaurant.bind(controller)),
);
restaurantRouter.delete(
  '/:id',
  asyncHandler(controller.deleteRestaurant.bind(controller)),
);
