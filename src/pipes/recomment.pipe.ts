import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ReCommentPipe implements PipeTransform {
  transform({
    commentId,
    reCommentContent,
    userId,
    boardId,
  }: {
    reCommentContent: string;
    userId: string;
    commentId: string;
    boardId: string;
  }) {
    if (emptyValueCheck([commentId, reCommentContent, userId, boardId])) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { commentId, reCommentContent, userId, boardId };
  }
}
