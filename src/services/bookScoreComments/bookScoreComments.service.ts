import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookScoreComment } from '@/entities/bookScoreComments/bookScoreComments.entity';

@Injectable()
export class BookScoreCommentsService {
  constructor(
    @InjectRepository(BookScoreComment)
    private readonly bookScoreCommentRepository: Repository<BookScoreComment>,
  ) {
    this.bookScoreCommentRepository = bookScoreCommentRepository;
  }

  getAllBookScoreCommentList(): Promise<BookScoreComment[]> {
    return this.bookScoreCommentRepository.find();
  }
}
