import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyScheduleEntity } from './entities/study-schedule.entity';
import { ScheduleItemEntity } from './entities/schedule-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyScheduleEntity, ScheduleItemEntity])],
  exports: [TypeOrmModule],
})
export class StudyScheduleModule {}
