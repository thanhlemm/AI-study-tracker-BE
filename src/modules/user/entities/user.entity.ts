import { AiInsightEntity } from 'src/modules/ai-insight/entities/ai-insight.entity';
import { LearningGoalEntity } from 'src/modules/learning-goal/entities/learning-goal.entity';
import { StudyAreaEntity } from 'src/modules/study-area/entities/study-area.entity';
import { StudyScheduleEntity } from 'src/modules/study-schedule/entities/study-schedule.entity';
import { StudySessionEntity } from 'src/modules/study-session/entities/study-session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

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
