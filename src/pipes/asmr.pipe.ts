import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AsmrPipe implements PipeTransform {
  transform({
    asmrFileName,
    userId,
    title,
  }: {
    asmrFileName: string;
    userId: string;
    title: string;
  }) {
    if (emptyValueCheck([asmrFileName, userId, title])) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { asmrFileName, userId, title };
  }
}
