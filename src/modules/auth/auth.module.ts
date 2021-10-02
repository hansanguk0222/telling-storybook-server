import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/users/users.entity';
import { AuthService } from '@/services/auth/auth.service';
import { AuthController } from '@/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
