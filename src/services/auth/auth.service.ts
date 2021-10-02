import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
  }

  async signIn({ email }: { email: string }): Promise<{
    user: User;
    accessToken: string;
  }> {
    const user = await this.userRepository.findOne({ email });
    const accessToken = this.jwtService.sign(
      { email },
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: 60 * 5 },
    );
    return { user, accessToken };
  }

  async signUp({
    email,
    nickname,
  }: {
    email: string;
    nickname: string;
  }): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = `Bearer ${this.jwtService.sign(
      { email, nickname },
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: 60 * 5 },
    )}`;
    const refreshToken = `Bearer ${this.jwtService.sign(
      { email, nickname },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: 60 * 60 * 24 * 60 },
    )}`;
    const user = await this.userRepository.save({
      email,
      nickname,
      refresh_token: refreshToken,
    });

    return { user, accessToken, refreshToken };
  }
}
