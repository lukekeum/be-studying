import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string) {
    const refreshTokenId = crypto.randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        { sub: userId },
        {
          secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.sign(
        { sub: userId, tokenId: refreshTokenId },
        {
          secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    const hashedToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await this.prisma.refreshToken.create({
      data: {
        id: refreshTokenId,
        tokenHash: hashedToken,
        userId: userId,
      },
    });

    return [accessToken, refreshToken] as const;
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
    });
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
    });

    const hashedToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { id: payload.tokenId },
    });

    if (!storedToken) {
      throw new UnauthorizedException();
    }

    if (storedToken.isRevoked || storedToken.tokenHash !== hashedToken) {
      throw new UnauthorizedException();
    }

    await this.prisma.refreshToken.update({
      where: {
        id: payload.tokenId,
      },
      data: {
        isRevoked: true,
      },
    });

    return this.generateTokens(payload.sub);
  }
}
