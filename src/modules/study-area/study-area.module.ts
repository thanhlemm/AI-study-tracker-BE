import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyAreaEntity } from './entities/study-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyAreaEntity])],
  exports: [TypeOrmModule],
})
export class StudyAreaModule {}
