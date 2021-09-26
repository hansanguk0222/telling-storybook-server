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
}
