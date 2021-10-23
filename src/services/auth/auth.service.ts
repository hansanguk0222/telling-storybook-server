import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
  }

  async signIn({ email }: { email: string }): Promise<
    | {
        userId: number;
        accessToken: string;
      }
    | false
  > {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const accessToken = this.jwtService.sign(
        { email },
        { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: 60 * 5 },
      );
      const refreshToken = `Bearer ${this.jwtService.sign(
        { email },
        { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: 60 * 60 * 24 * 60 },
      )}`;
      const newUser = await this.userRepository.save({
        ...user,
        refresh_token: refreshToken,
        updated_at: new Date().toISOString(),
      });
      return { userId: newUser._id, accessToken };
    }
    return false;
  }

  async signUp({
    email,
    nickname,
  }: {
    email: string;
    nickname: string;
  }): Promise<{
    userId: number;
    accessToken: string;
  }> {
    const accessToken = `Bearer ${this.jwtService.sign(
      { email },
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: 60 * 5 },
    )}`;
    const refreshToken = `Bearer ${this.jwtService.sign(
      { email },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: 60 * 60 * 24 * 60 },
    )}`;
    const user = await this.userRepository.save({
      email,
      nickname,
      refresh_token: refreshToken,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });

    return { userId: user._id, accessToken };
  }

  async createAccessToken({
    userId,
  }: {
    userId: number;
  }): Promise<{ userId: number; accessToken: string } | false> {
    const user = await this.userRepository.findOne({ _id: userId });
    const token = user.refresh_token.split(' ')[1];
    if (
      this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      })
    ) {
      const accessToken = `Bearer ${this.jwtService.sign(
        { email: user.email },
        { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: 60 * 5 },
      )}`;
      return { userId: user._id, accessToken };
    }
    return false;
  }
}
