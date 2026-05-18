import { Module } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  exports: [RestaurantRepository],
  providers: [RestaurantRepository],
})
export class RepositoryModule {}
