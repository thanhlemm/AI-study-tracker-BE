import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig, DatabaseConfigName } from '../config/database.config';
import { ServerConfig, ServerConfigName } from '@/config/server.config';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(DatabaseFactory.name);

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig =
      this.configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);

    // database.config.ts (registerAs)
    //    ↓
    // ConfigService (NestJS)
    //    ↓
    // database.factory.ts (getOrThrow)
    //    ↓
    // TypeOrmModule

    const serverConfig =
      this.configService.getOrThrow<ServerConfig>(ServerConfigName);

    // Log database connection info (hide password)
    this.logger.debug(
      `Database Connection: ${dbConfig.username}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
    );

    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,

      // Auto load all entities
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],

      // Synchronize schema (only for development)
      synchronize: dbConfig.synchronize,

      // Enable/disable logging
      // logging: dbConfig.logging || serverConfig.nodeEnv === 'development',
      // logging: ['error', 'warn'],

      // Connection pool settings
      extra: {
        max: dbConfig.maxConnections,
        min: dbConfig.minConnections,
        // Connection timeout
        connectionTimeoutMillis: 60000,
        // Idle timeout
        idleTimeoutMillis: 30000,
        // Statement timeout
        statement_timeout: 45000,
      },

      // SSL configuration (for production)
      ssl: dbConfig.ssl
        ? {
            rejectUnauthorized: false, // Set to true in production with proper certificates
          }
        : false,

      // Retry connection
      retryAttempts: 10,
      retryDelay: 3000,

      // Auto load subscribers and migrations
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      migrations: dbConfig.migrations,

      // CLI config for migrations
      migrationsRun: dbConfig.migrationsRun, // Set to true to auto-run migrations on startup
    };

    // Warning for production
    if (serverConfig.nodeEnv === 'production' && dbConfig.synchronize) {
      this.logger.warn(
        '⚠️  WARNING: synchronize is enabled in production! This should be disabled and use migrations instead.',
      );
    }

    return options;
  }
}
