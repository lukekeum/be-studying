import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './guard/jwt.guard';

@Module({
  providers: [PasswordService, AuthService, JwtGuard],
  exports: [PasswordService, AuthService, JwtGuard],
  imports: [
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    ConfigModule,
  ],
})
export class SecurityModule {}
