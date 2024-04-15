import {Body, Controller, Get, HttpCode, HttpStatus, Post,Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "../guards/auth.guard";
import {UsersService} from "../modules/users/users.service";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  getProfile(@Request() req) {
    return this.authService.verifyUser(req.user);
  }

}
