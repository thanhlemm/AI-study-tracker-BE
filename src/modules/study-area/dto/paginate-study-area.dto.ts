import { Type } from 'class-transformer';
import { StudyAreaResponseDto } from './study-area-response.dto';

// ====== PAGINATED RESPONSE DTO ======
export class PaginatedStudyAreaDto {
  @Type(() => StudyAreaResponseDto)
  data: StudyAreaResponseDto[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}