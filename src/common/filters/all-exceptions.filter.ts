// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger } from '../logger/winston.logger';

// Bắt TẤT CẢ exceptions không được xử lý trong ứng dụng
// Chuyển đổi exceptions thành HTTP responses có cấu trúc thống nhất
// Log errors để debug và monitoring

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject('Logger') private readonly logger: WinstonLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    // Log error với WinstonLogger
    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} - ${message}`,
        exception instanceof Error ? exception.stack : '',
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} - ${message}`);
    }

    response.status(status).json(errorResponse);
  }
}
