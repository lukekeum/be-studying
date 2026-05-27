import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { RestaurantRepository } from 'src/repository/restaurant.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    await this.restaurantRepository.create(createRestaurantDto);
  }

  async getAll() {
    return await this.prisma.restaurant.findMany({
      select: { name: true, phone: true, address: true },
    });
  }

  async getByName(name: string) {
    return await this.restaurantRepository.findByName(name);
  }

  async update(name: string, data: UpdateRestaurantDto) {
    await this.restaurantRepository.update(name, data);
  }
}
