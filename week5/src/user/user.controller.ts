import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/signUp.dto';
import { UserService } from './user.service';
import { SignInDTO } from './dto/signIn.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signupUser(@Body() body: SignUpDTO) {
    return this.userService.signUpUser(body);
  }

  @Post('signin')
  signinUser(@Body() body: SignInDTO) {
    return this.userService.signInUser(body);
  }
}
