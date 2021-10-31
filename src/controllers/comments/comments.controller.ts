import { ERROR } from '@/ constants';
import { CommentPipe } from '@/pipes/comment.pipe';
import { CommentsService } from '@/services/comments/comments.service';
import {
  Controller,
  Res,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getList() {
    const commentList = await this.commentsService.getAllCommentList();
    return { commentList };
  }

  @Post('/write')
  async writeComment(
    @Res({ passthrough: true }) res: Response,
    @Body(CommentPipe)
    commentInfo: {
      boardId: string;
      commentContent: string;
      userId: string;
    },
  ) {
    try {
      const { commentContent, boardId, userId } = commentInfo;
      const { comment } = await this.commentsService.createComment({
        boardId,
        commentContent,
        userId,
      });
      const changeKeyNameComment = {
        _id: comment._id,
        commentContent: comment.comment_content,
        createdAt: comment.created_at,
        updatedAt: comment.updated_at,
        userId: comment.user_id,
        boardId: comment.board_id,
      };
      return { comment: changeKeyNameComment };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/boards/:boardId')
  async getCommentsByBoardId(
    @Res({ passthrough: true }) res: Response,
    @Param('boardId') boardId: string,
  ) {
    try {
      const { comments } = await this.commentsService.getCommentsByBoardId({
        boardId,
      });
      const changeKeyNameComments = [];
      comments.map((item) => {
        changeKeyNameComments.push({
          _id: item._id,
          commentContent: item.comment_content,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          userId: item.user_id,
          boardId: item.board_id,
        });
      });
      return { comments: changeKeyNameComments };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
