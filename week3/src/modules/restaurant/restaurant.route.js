import { Router } from 'express';
import { RestaurantController } from './restaurant.controller.js';
import { RestaurantService } from './restaurant.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { RestaurantRepository } from '../../repositories/restaurant.js';

export const restaurantRouter = Router();

const restaurantRepository = new RestaurantRepository();

const service = new RestaurantService(restaurantRepository);
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
  '/:name',
  controller.hasNameParam.bind(controller),
  asyncHandler(controller.updateRestaurant.bind(controller)),
);
restaurantRouter.delete(
  '/:name',
  controller.hasNameParam.bind(controller),
  asyncHandler(controller.deleteRestaurant.bind(controller)),
);
