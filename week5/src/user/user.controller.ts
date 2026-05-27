import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignUpDTO } from './dto/signUp.dto';
import { UserService } from './user.service';
import { SignInDTO } from './dto/signIn.dto';
import express from 'express';
import { AuthService } from 'src/common/security/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signupUser(@Body() body: SignUpDTO) {
    return this.userService.signUpUser(body);
  }

  @Post('signin')
  async signinUser(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const [accessToken, refreshToken] = await this.userService.signInUser(body);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return {
      accessToken,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const token = req.cookies.refreshToken;

    const [accessToken, refreshToken] = await this.authService.refresh(token);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return { accessToken };
  }
}
