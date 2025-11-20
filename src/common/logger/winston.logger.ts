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

    const logLevel = serverConfig.nodeEnv === 'development' ? 'debug' : 'warn';

    // Console: NestJS-like format
    const consoleFormat = winston.format.combine(
      winston.format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        const pid = process.pid;
        const contextStr = context ? `[${context}] ` : '';
        const levelUpper = level.toUpperCase().padEnd(7);
        const traceStr = trace ? `\n${trace}` : '';

        return `[Nest] ${pid}  - ${timestamp}   ${levelUpper} ${contextStr}${message}${traceStr}`;
      }),
    );

    // File: JSON format
    const fileFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    );

    const dailyRotateFile = new DailyRotateFile({
      level: logLevel,
      dirname: logsPath,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Tự động nén các tệp nhật ký cũ
      handleExceptions: true, // Ghi lại các ngoại lệ không xử lý
      maxSize: '20m', // Tối đa kích thước tệp là 20MB
      maxFiles: '14d', // Giữ lại các tệp nhật ký trong 14 ngày
      format: fileFormat,
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
          // format: winston.format.combine(
          //   winston.format.errors({ stack: true }),
          //   winston.format.prettyPrint(),
          // ),
          format: consoleFormat,
        }),
        dailyRotateFile,
      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
