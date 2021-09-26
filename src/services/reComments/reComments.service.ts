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
}
