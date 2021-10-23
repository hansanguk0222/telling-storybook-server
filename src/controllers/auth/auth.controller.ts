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
import { AccessTokenPipe } from '@/pipes/refreshToken.pipe';
import { userInfo } from 'os';

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
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/accesstoken/refresh')
  async createAccessToken(
    @Res({ passthrough: true }) res: Response,
    @Body(AccessTokenPipe) userInfo: { userId: number },
  ) {
    try {
      const { userId } = userInfo;
      const authServiceResult = await this.authService.createAccessToken({
        userId,
      });
      if (authServiceResult) {
        const { userId, accessToken } = authServiceResult;
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
