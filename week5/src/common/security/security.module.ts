import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PasswordService, AuthService],
  exports: [PasswordService, AuthService],
  imports: [
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    ConfigModule,
  ],
})
export class SecurityModule {}
