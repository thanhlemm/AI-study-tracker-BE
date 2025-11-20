import { AiInsightEntity } from '@/modules/ai-insight/entities/ai-insight.entity';
import { LearningGoalEntity } from '@/modules/learning-goal/entities/learning-goal.entity';
import { SkillEntity } from '@/modules/skill/entities/skill.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('study_areas')
@Index(['userId', 'name'], { unique: true })
export class StudyAreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  iconUrl: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  color: string; // "#FF5733"

  // AI Context
  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  targetScore: number;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  proficiencyLevel: string; // "beginner", "intermediate", "advanced"

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.studyAreas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => SkillEntity, (skill) => skill.studyArea, {
    cascade: true,
    eager: false,
  })
  skills: SkillEntity[];

  @OneToMany(() => AiInsightEntity, (insight) => insight.studyArea, {
    cascade: true,
    eager: false,
  })
  aiInsights: AiInsightEntity[];

  @OneToMany(() => LearningGoalEntity, (goal) => goal.studyArea, {
    cascade: true,
    eager: false,
  })
  learningGoals: LearningGoalEntity[];
}
