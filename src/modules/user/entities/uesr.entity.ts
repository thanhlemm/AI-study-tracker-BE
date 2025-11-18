import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer'; // Để loại bỏ các trường khi serialize
import { Role } from 'src/modules/auth/entities/role.entity';

@Entity('users')
@Index(['id', 'status'])
@Index(['email', 'status'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
    select: false,
  })
  @Index() // Index riêng cho email
  @Exclude()
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    select: false,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    select: false,
  })
  @Exclude()
  googleId?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  profilePicUrl?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  googleProfilePicUrl?: string;

  // Many-to-One relationship với Role
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: Role;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  roleId?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}