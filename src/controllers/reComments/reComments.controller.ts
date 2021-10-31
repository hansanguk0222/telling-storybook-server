import { ERROR } from '@/ constants';
import { ReCommentPipe } from '@/pipes/recomment.pipe';
import { ReCommentsService } from '@/services/reComments/reComments.service';
import {
  Controller,
  Get,
  Res,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('recomments')
export class ReCommentsController {
  constructor(private readonly reCommentsService: ReCommentsService) {}

  @Get()
  async getList() {
    const reCommentList = await this.reCommentsService.getAllReCommentList();
    return { reCommentList };
  }

  @Post('/write')
  async writeReComment(
    @Res({ passthrough: true }) res: Response,
    @Body(ReCommentPipe)
    reCommentInfo: {
      commentId: string;
      reCommentContent: string;
      userId: string;
      boardId: string;
    },
  ) {
    try {
      const { commentId, userId, reCommentContent, boardId } = reCommentInfo;
      const { reComment } = await this.reCommentsService.createRecomment({
        commentId,
        userId,
        reCommentContent,
        boardId,
      });
      const changeKeyNameReComment = {
        _id: reComment._id,
        reCommentContent: reComment.re_comment_content,
        createdAt: reComment.created_at,
        updatedAt: reComment.updated_at,
        userId: reComment.user_id,
        boardId: reComment.board_id,
        commentId: reComment.comment_id,
      };
      return { reComment: changeKeyNameReComment };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/boards/:boardId')
  async getReCommentsByBoardId(
    @Res({ passthrough: true }) res: Response,
    @Param('boardId') boardId: string,
  ) {
    try {
      const { reComments } =
        await this.reCommentsService.getRecommentsByBoardId({
          boardId,
        });
      const changeKeyNameReComments = [];
      reComments.map((item) => {
        changeKeyNameReComments.push({
          _id: item._id,
          reCommentContent: item.re_comment_content,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          userId: item.user_id,
          boardId: item.board_id,
          commentId: item.comment_id,
        });
      });
      return { reComments: changeKeyNameReComments };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
