import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningGoalEntity } from './entities/learning-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningGoalEntity])],
  exports: [TypeOrmModule],
})
export class LearningGoalModule {}
