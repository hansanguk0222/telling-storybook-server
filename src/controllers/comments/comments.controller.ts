import { CommentsService } from '@/services/comments/comments.service';
import { Controller, Get } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getList() {
    const commentList = await this.commentsService.getAllCommentList();
    return { commentList };
  }
}
