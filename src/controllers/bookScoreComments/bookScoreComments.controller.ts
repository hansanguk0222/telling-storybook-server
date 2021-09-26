import { BookScoreCommentsService } from '@/services/bookScoreComments/bookScoreComments.service';
import { Controller, Get } from '@nestjs/common';

@Controller('bookscorecomments')
export class BookScoreCommentsController {
  constructor(
    private readonly bookScoreCommentsService: BookScoreCommentsService,
  ) {}

  @Get()
  async getList() {
    const bookScoreCommentList =
      await this.bookScoreCommentsService.getAllBookScoreCommentList();
    return { bookScoreCommentList };
  }
}
