import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { SecurityModule } from './common/security/security.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    RestaurantModule,
    PrismaModule,
    UserModule,
    RatingModule,
    SecurityModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
