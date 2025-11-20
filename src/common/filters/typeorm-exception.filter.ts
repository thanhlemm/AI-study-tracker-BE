// src/common/filters/typeorm-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { WinstonLogger } from '../logger/winston.logger';

// Bắt database errors từ TypeORM cụ thể
// Chuyển đổi PostgreSQL error codes thành HTTP status codes có ý nghĩa
// Ẩn chi tiết database error khỏi client (security)

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(@Inject('Logger') private readonly logger: WinstonLogger) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error occurred';

    // PostgreSQL error codes
    const errorCode = (exception as any).code;

    switch (errorCode) {
      case '23505': // Unique violation
        status = HttpStatus.CONFLICT;
        message = 'Resource already exists';
        break;
      case '23503': // Foreign key violation
        status = HttpStatus.BAD_REQUEST;
        message = 'Referenced resource does not exist';
        break;
      case '23502': // Not null violation
        status = HttpStatus.BAD_REQUEST;
        message = 'Required field is missing';
        break;
      case '22P02': // Invalid text representation
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid data format';
        break;
      default:
        this.logger.error(
          `Unhandled database error: ${errorCode}`,
          exception.stack,
        );
    }

    this.logger.warn(
      `${request.method} ${request.url} - ${message} (${errorCode})`,
    );

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
