import { ERROR } from '@/ constants';
import { AuthService } from '@/services/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mixin } from 'ts-mixer';

@Injectable()
export class AuthGuard
  extends Mixin(JwtService, AuthService)
  implements CanActivate
{
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { authorization, email } = request.headers;

    if (authorization === undefined) {
      throw new HttpException(ERROR.EMPTY_AUTH_TOKEN, HttpStatus.BAD_REQUEST);
    }

    const token = authorization.split(' ')[1];
    request.user = this.validateToken({ email, token });
    return true;
  }

  async validateToken({
    email,
    token,
  }: {
    email: string;
    token: string;
  }): Promise<{
    email: string;
  }> {
    try {
      return this.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      switch (error.message) {
        case 'jwt expired':
        case 'invalid token':
          try {
            const refreshToken = await this.getRefreshToken({ email });
            return this.verify(refreshToken, {
              secret: process.env.REFRESH_TOKEN_KEY,
            });
          } catch (error) {
            switch (error.message) {
              case 'jwt expired':
              case 'invalid token':
                throw new HttpException(
                  ERROR.EXPIRED_TOKEN,
                  HttpStatus.UNAUTHORIZED,
                );
            }
          }
        default:
          throw new HttpException(
            ERROR.SERVER_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
