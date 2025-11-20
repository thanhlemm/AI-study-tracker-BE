import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsArray,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'Password phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
    message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số',
  })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  studyGoal?: string;

  @IsOptional()
  @IsNumber()
  availableHoursPerWeek?: number;

  @IsOptional()
  @IsArray()
  preferredStudyTimes?: string[];
}
