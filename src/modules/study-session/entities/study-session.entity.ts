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
import { SkillEntity } from '../../skill/entities/skill.entity';

@Entity('study_sessions')
@Index(['userId', 'sessionDate'])
@Index(['skillId', 'sessionDate'])
export class StudySessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  skillId: string;

  // Time
  @Column({ type: 'date' })
  sessionDate: Date;

  @Column({ type: 'int' })
  sessionDurationMinutes: number;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  // Content & Results
  @Column({ type: 'text', nullable: true })
  contentSummary: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  maxScore: number;

  // Feeling
  @Column({ type: 'varchar', length: 50, nullable: true })
  difficultyFelt: string; // "too_easy", "just_right", "too_hard"

  @Column({ type: 'int', nullable: true })
  confidenceLevel: number; // 1-5

  // Engagement
  @Column({ type: 'int', nullable: true })
  focusLevel: number; // 1-5

  @Column({ type: 'varchar', length: 50, nullable: true })
  mood: string; // "motivated", "tired", "bored"

  // AI Analysis
  @Column({ type: 'boolean', default: false })
  aiReviewed: boolean;

  @Column({ type: 'json', nullable: true })
  aiInsights: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.studySessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skillId' })
  skill: SkillEntity;
}
