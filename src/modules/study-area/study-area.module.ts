import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyAreaEntity } from './entities/study-area.entity';
import { StudyAreaService } from './study-area.service';
import { StudyAreaController } from './study-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyAreaEntity])],
  controllers: [StudyAreaController],
  providers: [StudyAreaService],
  exports: [StudyAreaService],
})
export class StudyAreaModule {}
