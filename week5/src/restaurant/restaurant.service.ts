import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export const restaurantSelect = {
  name: true,
  phone: true,
  address: true,
} satisfies Prisma.RestaurantSelect;

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      return await this.prisma.restaurant.create({
        data: createRestaurantDto,
        select: restaurantSelect,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('이미 존재하는 식당 이름입니다.');
      } else {
        throw e;
      }
    }
  }

  async getAll() {
    return await this.prisma.restaurant.findMany({
      select: restaurantSelect,
    });
  }

  async getByName(name: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { name },
      select: restaurantSelect,
    });

    if (!restaurant) {
      throw new NotFoundException('식당을 찾을 수 없습니다.');
    }

    return restaurant;
  }

  async update(name: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      return await this.prisma.restaurant.update({
        where: { name },
        data: updateRestaurantDto,
        select: restaurantSelect,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('식당을 찾을 수 없습니다.');
          case 'P2002':
            throw new ConflictException('이미 존재하는 식당 이름입니다.');
        }
      } else {
        throw e;
      }
    }
  }
}
