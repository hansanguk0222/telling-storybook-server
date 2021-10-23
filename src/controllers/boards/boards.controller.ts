import { BoardsService } from '@/services/boards/boards.service';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@/middlewares/AuthGuard.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BoardPipe } from '@/pipes/board.pipe';
import { ERROR } from '@/ constants';
import { Response } from 'express';
import { AuthService } from '@/services/auth/auth.service';
import { options } from 'joi';

@Controller('boards')
@UseGuards(new AuthGuard(new JwtModule()))
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('/write')
  async writeBoard(
    @Res({ passthrough: true }) res: Response,
    @Body(BoardPipe)
    boardInfo: {
      boardContent: string;
      boardType: string;
      boardTitle: string;
      readingTime: number;
      userId: number;
    },
  ) {
    try {
      console.log(boardInfo);
      const { boardContent, boardType, boardTitle, readingTime, userId } =
        boardInfo;
      const board = await this.boardsService.writeBoard({
        userId,
        boardContent,
        boardType,
        boardTitle,
        readingTime,
      });
      return { board };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':boardtype')
  async getBaordList(
    @Res({ passthrough: true }) res: Response,
    @Param('boardtype') boardtype: string,
  ) {
    try {
      console.log(boardtype);
      const { boardList } = await this.boardsService.getBoardList({
        boardType: boardtype,
      });
      const changeKeyNameBoardList = boardList.map((item) => ({
        _id: item._id,
        boardType: item.board_type,
        boardContent: item.board_content,
        boardTitle: item.board_title,
        boardViews: item.board_views,
        createdAt: item.created_at,
      }));
      if (boardtype === '독후감') {
        boardList.map((item, idx) => {
          changeKeyNameBoardList[idx].boardViews = item.board_views;
        });
      }
      return { boardList: changeKeyNameBoardList };
    } catch (err) {}
  }
}
