import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [RestaurantModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
