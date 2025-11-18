import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudyScheduleEntity } from './study-schedule.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { StudySessionEntity } from '../../study-session/entities/study-session.entity';

@Entity('schedule_items')
export class ScheduleItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  scheduleId: string;

  @Column({ type: 'uuid' })
  skillId: string;

  @Column({ type: 'int' })
  dayOfWeek: number; // 0-6 (Mon-Sun)

  @Column({ type: 'int', nullable: true })
  weekNumber: number;

  // Suggestion
  @Column({ type: 'int' })
  suggestedDurationMinutes: number;

  @Column({ type: 'time', nullable: true })
  suggestedTime: string;

  // AI Reasoning
  @Column({ type: 'text', nullable: true })
  recommendationReason: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  priorityScore: number;

  // Status
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  actualSessionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => StudyScheduleEntity, (schedule) => schedule.scheduleItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scheduleId' })
  schedule: StudyScheduleEntity;

  @ManyToOne(() => SkillEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skillId' })
  skill: SkillEntity;

  @ManyToOne(() => StudySessionEntity, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'actualSessionId' })
  actualSession: StudySessionEntity;
}
