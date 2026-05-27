import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { SecurityModule } from './common/security/security.module';

@Module({
  imports: [
    RestaurantModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RatingModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
