import { AiInsightEntity } from '@/modules/ai-insight/entities/ai-insight.entity';
import { StudyAreaEntity } from '@/modules/study-area/entities/study-area.entity';
import { StudySessionEntity } from '@/modules/study-session/entities/study-session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';


@Entity('skills')
export class SkillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  studyAreaId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  orderIndex: number;

  // AI Tracking
  @Column({ type: 'varchar', length: 50, nullable: true })
  difficultyLevel: string; // "easy", "medium", "hard"

  @Column({ type: 'int', nullable: true })
  estimatedHours: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => StudyAreaEntity, (area) => area.skills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studyAreaId' })
  studyArea: StudyAreaEntity;

  @OneToMany(() => StudySessionEntity, (session) => session.skill, {
    cascade: true,
    eager: false,
  })
  sessions: StudySessionEntity[];

  @OneToMany(() => AiInsightEntity, (insight) => insight.skill, {
    cascade: true,
    eager: false,
  })
  aiInsights: AiInsightEntity[];
}
