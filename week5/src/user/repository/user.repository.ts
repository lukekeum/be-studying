import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SignUpDTO } from 'src/user/dto/signUp.dto';
import { userSelectWithoutPassword, userAuthSelect } from './user.select';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SignUpDTO) {
    return await this.prisma.user.create({
      data,
      select: userSelectWithoutPassword,
    });
  }

  async findAuthUserByName(name: string) {
    return await this.prisma.user.findUnique({
      where: { name },
      select: userAuthSelect,
    });
  }
}
