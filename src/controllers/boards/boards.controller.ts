import { BoardsService } from '@/services/boards/boards.service';
import { Controller, Get } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getList() {
    const boardList = await this.boardsService.getAllBoardList();
    return { boardList };
  }
}
