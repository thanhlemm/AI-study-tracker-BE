import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  exports: [TypeOrmModule],
})
export class SkillModule {}
