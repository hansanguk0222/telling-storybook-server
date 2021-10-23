import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class BoardPipe implements PipeTransform {
  transform({
    boardContent,
    boardType,
    boardTitle,
    readingTime,
    userId,
  }: {
    boardType: string;
    boardContent: string;
    boardTitle: string;
    readingTime: string;
    userId: string;
  }) {
    if (
      emptyValueCheck([
        boardContent,
        boardType,
        boardTitle,
        readingTime,
        userId,
      ])
    ) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(boardContent, boardType, boardTitle, readingTime, userId);
    return { boardContent, boardType, boardTitle, readingTime, userId };
  }
}
