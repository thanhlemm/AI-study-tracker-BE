import { StudySessionEntity } from '@/modules/study-session/entities/study-session.entity';
import { AiInsightEntity } from '@/modules/ai-insight/entities/ai-insight.entity';
import { LearningGoalEntity } from '@/modules/learning-goal/entities/learning-goal.entity';
import { StudyAreaEntity } from '@/modules/study-area/entities/study-area.entity';
import { StudyScheduleEntity } from '@/modules/study-schedule/entities/study-schedule.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  timezone: string;

  // AI Preferences
  @Column({ type: 'text', nullable: true })
  studyGoal: string;

  @Column({ type: 'int', nullable: true })
  availableHoursPerWeek: number;

  @Column({ type: 'json', nullable: true })
  preferredStudyTimes: string[]; // ["morning", "evening"]

  @Column({ nullable: true })
  @Exclude()
  hashedRefreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  // Relations
  @OneToMany(() => StudyAreaEntity, (area) => area.user, {
    cascade: true,
    eager: false,
  })
  studyAreas: StudyAreaEntity[];

  @OneToMany(() => StudySessionEntity, (session) => session.user, {
    cascade: true,
    eager: false,
  })
  studySessions: StudySessionEntity[];

  @OneToMany(() => AiInsightEntity, (insight) => insight.user, {
    cascade: true,
    eager: false,
  })
  aiInsights: AiInsightEntity[];

  @OneToMany(() => StudyScheduleEntity, (schedule) => schedule.user, {
    cascade: true,
    eager: false,
  })
  studySchedules: StudyScheduleEntity[];

  @OneToMany(() => LearningGoalEntity, (goal) => goal.user, {
    cascade: true,
    eager: false,
  })
  learningGoals: LearningGoalEntity[];
}
