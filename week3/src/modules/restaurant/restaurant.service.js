export class RestaurantService {
  constructor(restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async getAll() {
    const data = await this.restaurantRepository.findAll();
    return data;
  }

  async getByName(name) {
    const data = await this.restaurantRepository.findByName(name);
    return data;
  }

  async create(data) {
    await this.restaurantRepository.create(data);
    return data;
  }

  async update(name, data) {
    await this.restaurantRepository.update(name, data);
  }
}
