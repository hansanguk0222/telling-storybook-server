import { ERROR } from '@/ constants';
import { AuthService } from '@/services/auth/auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class LocalStrategy {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    this.authService = authService;
    this.jwtService = jwtService;
  }
  async isValidateUser(token: string) {
    const { email } = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });

    if (email === undefined) {
      throw new HttpException(ERROR.EMPTY_AUTH_TOKEN, HttpStatus.BAD_REQUEST);
    }

    return await this.findUser(email);
  }

  async findUser(email: string) {
    try {
      const user = this.authService.signIn({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        ERROR.SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
