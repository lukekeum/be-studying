import { Controller, Get, Post, Query } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  @Get()
  getRestaurants(@Query('name') name?: string) {
    return name;
  }

  @Post()
  createRestaurant() {}
}
