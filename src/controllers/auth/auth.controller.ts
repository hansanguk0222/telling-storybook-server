import { AuthService } from '@/services/auth/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginPipe } from '@/pipes/login.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body(LoginPipe) userInfo: { email: string; nickname: string },
  ) {
    try {
      const { email, nickname } = userInfo;
      const { user, accessToken } = await this.authService.signIn({
        email,
      });
      if (user && accessToken) {
        return { user, accessToken };
      } else {
        const { accessToken, refreshToken, user } =
          await this.authService.signUp({ email, nickname });
        return res.status(201).json({ user, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ err });
    }
  }
}
