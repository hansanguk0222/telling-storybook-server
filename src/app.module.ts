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
@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    UsersModule,
    BoardsModule,
    AsmrsModule,
    CommentsModule,
    ReCommentsModule,
    BookScoreCommentsModule,
    VoiceRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
