import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookScoreComment } from '@/entities/bookScoreComments/bookScoreComments.entity';
import { BookScoreCommentsService } from '@/services/bookScoreComments/bookScoreComments.service';
import { BookScoreCommentsController } from '@/controllers/bookScoreComments/bookScoreComments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookScoreComment])],
  providers: [BookScoreCommentsService],
  controllers: [BookScoreCommentsController],
  exports: [TypeOrmModule],
})
export class BookScoreCommentsModule {}
