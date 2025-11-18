import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from 'node_modules/@nestjs/config';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import { DatabaseFactory } from './setup/database.factory';
import { WinstonLogger } from './setup/winston.logger';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
    }),

    // PostgreSQL Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseFactory,
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: 'Logger',
      useClass: WinstonLogger, // Đây là logger tùy chỉnh sử dụng Winston
    },
  ],
})
export class AppModule {}
