import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StudyAreaEntity } from '../../study-area/entities/study-area.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

@Entity('ai_insights')
@Index(['userId', 'generatedAt'])
export class AiInsightEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  studyAreaId: string;

  @Column({ type: 'uuid', nullable: true })
  skillId: string;

  // Type
  @Column({ type: 'varchar', length: 50 })
  insightType: string; // "weakness", "habit", "suggestion"

  // Content
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  recommendation: string;

  // Analysis Data
  @Column({ type: 'jsonb', nullable: true })
  analysisData: Record<string, any>;

  // Priority
  @Column({ type: 'varchar', length: 50, nullable: true })
  severity: string; // "low", "medium", "high"

  @Column({ type: 'int', nullable: true })
  actionPriority: number; // 1-5

  // Status
  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @CreateDateColumn()
  generatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.aiInsights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => StudyAreaEntity, (area) => area.aiInsights, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'studyAreaId' })
  studyArea: StudyAreaEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.aiInsights, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'skillId' })
  skill: SkillEntity;
}
