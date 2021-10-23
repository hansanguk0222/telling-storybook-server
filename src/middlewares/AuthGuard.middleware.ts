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
export class AuthGuard extends Mixin(JwtService) implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException(ERROR.EMPTY_AUTH_TOKEN, HttpStatus.BAD_REQUEST);
    }

    const token = authorization.split(' ')[1];
    const result = this.validateToken({ token });
    return await result;
  }

  async validateToken({ token }: { token: string }): Promise<{
    email: string;
  }> {
    try {
      return await this.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      switch (error.message) {
        case 'jwt expired':
        case 'invalid token':
          throw new HttpException(ERROR.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED);
        default:
          throw new HttpException(
            ERROR.SERVER_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
