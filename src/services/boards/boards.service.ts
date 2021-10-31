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

  async writeBoard({
    boardContent,
    boardType,
    boardTitle,
    readingTime,
    userId,
  }: {
    boardContent: string;
    boardType: string;
    boardTitle: string;
    readingTime: number;
    userId: number;
  }) {
    console.log(boardContent, boardType, boardTitle, readingTime, userId);
    const board = await this.boardsRepository.save({
      user_id: userId,
      board_content: boardContent,
      board_title: boardTitle,
      board_type: boardType,
      reading_time: readingTime,
    });
    return { board };
  }

  async getBoardList({ boardType }: { boardType: string }) {
    const boardList = await this.boardsRepository.find({
      is_deleted: false,
      board_type: boardType,
    });
    console.log(boardList);
    return { boardList };
  }

  async getBoardById({ _id }: { _id: number }) {
    const board = await this.boardsRepository.find({
      _id,
    });
    await this.boardsRepository.update(
      { _id },
      { board_views: board[0].board_views + 1 },
    );
    return { board };
  }
}
