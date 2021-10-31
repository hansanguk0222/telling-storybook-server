import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReComment } from '@/entities/reComments/reComments.entity';

@Injectable()
export class ReCommentsService {
  constructor(
    @InjectRepository(ReComment)
    private readonly reCommentRepository: Repository<ReComment>,
  ) {
    this.reCommentRepository = reCommentRepository;
  }

  getAllReCommentList(): Promise<ReComment[]> {
    return this.reCommentRepository.find();
  }

  async createRecomment({
    commentId,
    reCommentContent,
    userId,
    boardId,
  }: {
    commentId: string;
    userId: string;
    reCommentContent: string;
    boardId: string;
  }) {
    const reComment = await this.reCommentRepository.save({
      user_id: Number(userId),
      comment_id: Number(commentId),
      re_comment_content: reCommentContent,
      board_id: Number(boardId),
    });
    return { reComment };
  }

  async getRecommentsByBoardId({ boardId }: { boardId: string }) {
    const reComments = await this.reCommentRepository.find({
      board_id: Number(boardId),
    });
    return { reComments };
  }
}
