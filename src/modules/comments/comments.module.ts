import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/entities/comments/comments.entity';
import { CommentsService } from '@/services/comments/comments.service';
import { CommentsController } from '@/controllers/comments/comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [TypeOrmModule],
})
export class CommentsModule {}
