import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './config/server.config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonLogger } from './common/logger/winston.logger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  const logger = app.get(WinstonLogger);
  app.useLogger(logger);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // tự động convert string → number, boolean nếu cần
      whitelist: true, // loại bỏ những thuộc tính không được khai báo trong DTO
      forbidNonWhitelisted: true, // ném lỗi nếu có thuộc tính không được khai báo trong DTO
    }),
  );

  // Filters
  app.useGlobalFilters(
    new AllExceptionsFilter(logger),
    new TypeOrmExceptionFilter(logger),
  );

  // Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new TransformInterceptor(),
  );

  await app.listen(serverConfig.port);
  console.log(
    `✅ Application is running on: http://localhost:${serverConfig.port}`,
  );
}
bootstrap();
