import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AccessTokenPipe implements PipeTransform {
  transform({ userId }: { userId: number }) {
    if (emptyValueCheck([userId])) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { userId };
  }
}
