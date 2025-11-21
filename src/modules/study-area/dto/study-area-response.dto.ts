import { UserResponseDto } from '@/modules/user/dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDecimal,
  IsDate,
  IsEnum,
  IsUUID,
  IsNumber,
} from 'class-validator';

// Enums
export enum ProficiencyLevelEnum {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

// ====== RESPONSE DTO ======
export class StudyAreaResponseDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  targetScore?: number;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  @IsEnum(ProficiencyLevelEnum)
  proficiencyLevel?: ProficiencyLevelEnum;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  // @Type(() => UserResponseDto)
  // user?: UserResponseDto;
}

// ====== RESPONSE DTO WITH RELATIONS ======
export class StudyAreaWithRelationsDto extends StudyAreaResponseDto {
  @IsOptional()
  skills?: any[];

  @IsOptional()
  aiInsights?: any[];

  @IsOptional()
  learningGoals?: any[];
}
