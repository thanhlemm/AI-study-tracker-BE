import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudySessionEntity } from './entities/study-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudySessionEntity])],
  exports: [TypeOrmModule],
})
export class StudySessionModule {}
