import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDecimal,
  IsDate,
  IsEnum,
  IsUrl,
  Length,
  MaxLength,
  Min,
  Max,
  Matches,
  IsNumber,
} from 'class-validator';

// Enums
export enum ProficiencyLevelEnum {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

// ====== UPDATE DTO ======
export class UpdateStudyAreaDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @IsOptional()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'color must be a valid hex color (e.g., #FF5733)',
  })
  color?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  @Type(() => Number)
  targetScore?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: Date;

  @IsOptional()
  @IsEnum(ProficiencyLevelEnum)
  proficiencyLevel?: ProficiencyLevelEnum;
}
