import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiInsightEntity } from './entities/ai-insight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiInsightEntity])],
  exports: [TypeOrmModule],
})
export class AiInsightModule {}
