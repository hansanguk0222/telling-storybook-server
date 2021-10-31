import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@/entities/comments/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    this.commentRepository = commentRepository;
  }

  getAllCommentList(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async createComment({
    boardId,
    commentContent,
    userId,
  }: {
    boardId: string;
    commentContent: string;
    userId: string;
  }) {
    const comment = await this.commentRepository.save({
      user_id: Number(userId),
      board_id: Number(boardId),
      comment_content: commentContent,
    });
    return { comment };
  }

  async getCommentsByBoardId({ boardId }: { boardId: string }) {
    const comments = await this.commentRepository.find({
      board_id: Number(boardId),
    });
    return { comments };
  }
}
