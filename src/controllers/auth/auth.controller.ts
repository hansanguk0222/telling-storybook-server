import { AuthService } from '@/services/auth/auth.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginPipe } from '@/pipes/login.pipe';
import { ERROR } from '@/ constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body(LoginPipe) userInfo: { email: string; nickname: string },
  ) {
    try {
      const { email, nickname } = userInfo;
      console.log(email, nickname);
      const authServiceResult = await this.authService.signIn({ email });
      if (authServiceResult) {
        const { userId, accessToken } = authServiceResult;
        return { userId, accessToken };
      } else {
        const { accessToken, userId } = await this.authService.signUp({
          email,
          nickname,
        });
        return { userId, accessToken };
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
