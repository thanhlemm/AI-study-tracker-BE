import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StudyAreaEntity } from '../../study-area/entities/study-area.entity';

@Entity('learning_goals')
export class LearningGoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  studyAreaId: string;

  @Column({ type: 'text' })
  goalStatement: string;

  @Column({ type: 'date' })
  targetDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  targetMetric: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  currentProgress: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.learningGoals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => StudyAreaEntity, (area) => area.learningGoals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studyAreaId' })
  studyArea: StudyAreaEntity;
}
