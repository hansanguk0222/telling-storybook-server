import { emptyValueCheck } from '@/utils/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LoginPipe implements PipeTransform {
  transform({ email, nickname }: { email: string; nickname: string }) {
    if (emptyValueCheck([email, nickname])) {
      throw new HttpException(
        '빈 값이 있어요 확인해주세요!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { email, nickname };
  }
}
