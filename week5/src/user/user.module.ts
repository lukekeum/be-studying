import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { SecurityModule } from 'src/common/security/security.module';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [PrismaModule, SecurityModule],
})
export class UserModule {}
