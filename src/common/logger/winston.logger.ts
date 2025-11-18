import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ServerConfig, ServerConfigName } from '../../config/server.config';
import { resolve } from 'path';

@Injectable()
export class WinstonLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const serverConfig =
      this.configService.getOrThrow<ServerConfig>(ServerConfigName);
    const logsPath = resolve(__dirname, '../..', serverConfig.logDirectory);

    const logLevel = serverConfig.nodeEnv === 'development' ? 'warn' : 'error';

    const dailyRotateFile = new DailyRotateFile({
      level: logLevel,
      dirname: logsPath,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Tự động nén các tệp nhật ký cũ
      handleExceptions: true, // Ghi lại các ngoại lệ không xử lý
      maxSize: '20m', // Tối đa kích thước tệp là 20MB
      maxFiles: '14d', // Giữ lại các tệp nhật ký trong 14 ngày
    });

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: logLevel,
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.prettyPrint(),
          ),
        }),
        dailyRotateFile,
      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    if (trace) {
      this.logger.error(`${message}\n${trace}`, trace);
    } else {
      this.logger.error(message);
    }
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
