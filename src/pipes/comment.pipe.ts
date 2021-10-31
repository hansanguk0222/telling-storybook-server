import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CommentPipe implements PipeTransform {
  transform({
    boardId,
    commentContent,
    userId,
  }: {
    commentContent: string;
    userId: string;
    boardId: string;
  }) {
    if (emptyValueCheck([boardId, commentContent, userId])) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { boardId, commentContent, userId };
  }
}
