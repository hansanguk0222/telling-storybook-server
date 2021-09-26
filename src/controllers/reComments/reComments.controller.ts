import { ReCommentsService } from '@/services/reComments/reComments.service';
import { Controller, Get } from '@nestjs/common';

@Controller('recomments')
export class ReCommentsController {
  constructor(private readonly reCommentsService: ReCommentsService) {}

  @Get()
  async getList() {
    const reCommentList = await this.reCommentsService.getAllReCommentList();
    return { reCommentList };
  }
}
