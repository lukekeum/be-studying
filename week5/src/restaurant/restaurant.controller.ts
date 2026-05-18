import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateRestaurantDto,
  FindRestaurantDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getRestaurants() {
    return this.restaurantService.getAll();
  }

  @Get('/:name')
  getRestuarantByName(@Param('name') name: string) {
    return this.restaurantService.getByName(name);
  }

  @Post()
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Patch('/:name')
  updateRestaurant(
    @Param('name') name: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(name, updateRestaurantDto);
  }
}
