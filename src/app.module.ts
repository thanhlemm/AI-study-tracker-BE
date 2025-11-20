import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import { DatabaseFactory } from './database/database.factory';
import { WinstonLogger } from './common/logger/winston.logger';
import { StudyAreaModule } from './modules/study-area/study-area.module';
import { SkillModule } from './modules/skill/skill.module';
import { StudySessionModule } from './modules/study-session/study-session.module';
import { AiInsightModule } from './modules/ai-insight/ai-insight.module';
import { StudyScheduleModule } from './modules/study-schedule/study-schedule.module';
import { LearningGoalModule } from './modules/learning-goal/learning-goal.module';
import { UserModule } from './modules/user/user.module';

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

    // Feature Modules
    AuthModule,
    UserModule,
    StudyAreaModule,
    SkillModule,
    StudySessionModule,
    AiInsightModule,
    StudyScheduleModule,
    LearningGoalModule,
  ],
  providers: [
    {
      provide: 'Logger',
      useClass: WinstonLogger,
    },
    WinstonLogger,
  ],
  exports: ['Logger', WinstonLogger],
})
export class AppModule {}
