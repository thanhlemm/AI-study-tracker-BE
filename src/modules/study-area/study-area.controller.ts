import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateStudyAreaDto,
  UpdateStudyAreaDto,
  StudyAreaResponseDto,
  StudyAreaWithRelationsDto,
  PaginatedStudyAreaDto,
} from './dto';
import { StudyAreaService } from './study-area.service';
import { UserEntity } from '../user/entities/user.entity';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

// Ghi chú:
// - Sử dụng @CurrentUser() decorator để lấy user từ JWT token
// - Service có methods: create, findAll, findById, findByIdWithRelations, update, delete
// - Controller gọi service và trả về response thích hợp
// - Xử lý lỗi: NotFoundException, ConflictException, BadRequestException
// - Sử dụng @HttpCode để chỉ định HTTP status code phù hợp

@Controller('study-areas')
export class StudyAreaController {
  constructor(private readonly studyAreaService: StudyAreaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: UserEntity,
    @Body() createStudyAreaDto: CreateStudyAreaDto,
  ): Promise<StudyAreaResponseDto> {
    return this.studyAreaService.create(user.id, createStudyAreaDto);
  }

  @Get()
  async findAll(
    @CurrentUser() user: UserEntity,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedStudyAreaDto> {
    return this.studyAreaService.findAll(user.id, page, limit);
  }

  @Get(':id')
  async findById(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<StudyAreaResponseDto> {
    return this.studyAreaService.findById(id, user.id);
  }

  @Get(':id/skills-aiInsights-learningGoals')
  async findByIdWithRelations(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<StudyAreaWithRelationsDto> {
    return this.studyAreaService.findByIdWithRelations(id, user.id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
    @Body() updateStudyAreaDto: UpdateStudyAreaDto,
  ): Promise<StudyAreaResponseDto> {
    return this.studyAreaService.update(id, user.id, updateStudyAreaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<void> {
    return this.studyAreaService.delete(id, user.id);
  }
}
