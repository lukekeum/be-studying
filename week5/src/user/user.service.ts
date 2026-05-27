import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signUp.dto';
import { UserRepository } from './repository/user.repository';
import { Prisma } from '@prisma/client';
import { SignInDTO } from './dto/signIn.dto';
import { PasswordService } from 'src/common/security/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async signUpUser({ name, displayName, password }: SignUpDTO) {
    try {
      const hashedPassword = await this.passwordService.hash(password);

      return await this.userRepository.create({
        name,
        displayName,
        password: hashedPassword,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('이미 존재하는 사용자입니다.');
        }
      }
      throw e;
    }
  }

  async signInUser({ name, password }: SignInDTO) {
    try {
      const user = await this.userRepository.findAuthUserByName(name);

      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다');
      }

      const isPasswordValid = await this.passwordService.compare(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('비번번호가 일치하지 않습니다');
      }

      return user; // TODO: JWT 및 쿠키 던지기
    } catch (e) {
      throw e;
    }
  }
}
