import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { BoardsModule } from './modules/boards/boards.module';
import { AppService } from './app.service';
import { AsmrsModule } from './modules/asmrs/asmrs.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReCommentsModule } from './modules/reComments/reComments.module';
import { BookScoreCommentsModule } from './modules/bookScoreComments/bookScoreComments.module';
import { VoiceRoomsModule } from './modules/voiceRooms/voiceRooms.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.prod',
      isGlobal: true,
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
      //   ACCESS_TOKEN_KEY: Joi.string().required(),
      //   REFRESH_TOKEN_KEY: Joi.string().required(),
      // }),
    }),
    UsersModule,
    BoardsModule,
    AsmrsModule,
    CommentsModule,
    ReCommentsModule,
    BookScoreCommentsModule,
    VoiceRoomsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
