import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { WinstonLogger } from '../logger/winston.logger';

// Log all requests/responses
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('Logger') private readonly logger: WinstonLogger) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
          this.logger.log(`${method} ${url} - ${responseTime}ms`);
      }),
    );
  }
}
