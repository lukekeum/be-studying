import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import express from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: express.Request = context.switchToHttp().getRequest();

    const token = this.getToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      });

      request['userId'] = payload.sub;

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  getToken(req: express.Request) {
    const header = req.headers.authorization;

    if (!header) {
      return null;
    }

    const [type, token] = header.split(' ');

    if (!type || type !== 'Bearer') {
      return null;
    }

    return token;
  }
}
