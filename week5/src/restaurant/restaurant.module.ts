import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  imports: [RepositoryModule, PrismaModule],
})
export class RestaurantModule {}
