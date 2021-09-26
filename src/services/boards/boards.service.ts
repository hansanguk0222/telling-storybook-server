import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '@/entities/boards/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {
    this.boardsRepository = boardsRepository;
  }

  getAllBoardList(): Promise<Board[]> {
    return this.boardsRepository.find();
  }
}
