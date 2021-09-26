import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        status,
        timeStamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        timeStamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
