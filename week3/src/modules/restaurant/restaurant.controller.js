import { CustomError } from '../../utils/CustomError.js';

export class RestaurantController {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
  }

  async getRestaurants(req, res) {
    const { name } = req.query;

    if (name) {
      const data = await this.restaurantService.findByName(name);
      return res.json(data);
    }

    const data = await this.restaurantService.getAll();
    return res.json(data);
  }

  async createRestaurant(req, res) {
    const data = req.body;

    const result = await this.restaurantService.create(data);
    return res.json(result);
  }

  async updateRestaurant(req, res) {
    const { name } = req.params;
    const data = req.body;

    const result = await this.restaurantService.update(name, data);
    return res.json(result);
  }

  async deleteRestaurant(req, res) {
    const { name } = req.params;

    const result = await this.restaurantService.delete(name);
    return res.json(result);
  }

  hasNameParam(req, res, next) {
    const { name } = req.params;

    if (!name) {
      throw new CustomError({
        message: 'name 쿼리파라미터가 존재하지 않습니다',
        statusCode: 400,
      });
    }

    next();
  }
}
