import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyAreaEntity } from './entities/study-area.entity';
import {
  CreateStudyAreaDto,
  UpdateStudyAreaDto,
  StudyAreaResponseDto,
  StudyAreaWithRelationsDto,
  PaginatedStudyAreaDto,
} from './dto';

// ====== SERVICE ======
@Injectable()
export class StudyAreaService {
  constructor(
    @InjectRepository(StudyAreaEntity)
    private readonly studyAreaRepository: Repository<StudyAreaEntity>,
  ) {}

  async create(
    userId: string,
    createStudyAreaDto: CreateStudyAreaDto,
  ): Promise<StudyAreaResponseDto> {
    try {
      const studyArea = this.studyAreaRepository.create({
        ...createStudyAreaDto,
        userId,
      });

      const savedStudyArea = await this.studyAreaRepository.save(studyArea);
      console.log('Created study area: ', savedStudyArea);
      return this.mapToResponseDto(savedStudyArea);
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException(
          `Study area "${createStudyAreaDto.name}" already exists for this user`,
        );
      }
      throw error;
    }
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedStudyAreaDto> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.studyAreaRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: data.map((item) => this.mapToResponseDto(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string, userId: string): Promise<StudyAreaResponseDto> {
    const studyArea = await this.studyAreaRepository.findOne({
      where: { id, userId },
      relations: ['user'],
    });

    if (!studyArea) {
      throw new NotFoundException(`Study area with id ${id} not found`);
    }

    return this.mapToResponseDto(studyArea);
  }

  async findByIdWithRelations(
    id: string,
    userId: string,
  ): Promise<StudyAreaWithRelationsDto> {
    const studyArea = await this.studyAreaRepository.findOne({
      where: { id, userId },
      relations: ['skills', 'aiInsights', 'learningGoals'],
    });

    if (!studyArea) {
      throw new NotFoundException(`Study area with id ${id} not found`);
    }

    return this.mapToResponseWithRelationsDto(studyArea);
  }

  async update(
    id: string,
    userId: string,
    updateStudyAreaDto: UpdateStudyAreaDto,
  ): Promise<StudyAreaResponseDto> {
    const studyArea = await this.studyAreaRepository.findOne({
      where: { id, userId },
    });

    if (!studyArea) {
      throw new NotFoundException(`Study area with id ${id} not found`);
    }

    try {
      const updatedStudyArea = await this.studyAreaRepository.save(
        this.studyAreaRepository.merge(studyArea, updateStudyAreaDto),
      );

      return this.mapToResponseDto(updatedStudyArea);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Study area name already exists for this user`,
        );
      }
      throw error;
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.studyAreaRepository.delete({
      id,
      userId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Study area with id ${id} not found`);
    }
  }

  private mapToResponseDto(studyArea: StudyAreaEntity): StudyAreaResponseDto {
    return {
      id: studyArea.id,
      userId: studyArea.userId,
      name: studyArea.name,
      description: studyArea.description,
      iconUrl: studyArea.iconUrl,
      color: studyArea.color,
      targetScore: studyArea.targetScore,
      deadline: studyArea.deadline,
      proficiencyLevel: studyArea.proficiencyLevel,
      createdAt: studyArea.createdAt,
      updatedAt: studyArea.updatedAt,
    //   user: studyArea.user,
    };
  }

  private mapToResponseWithRelationsDto(
    studyArea: StudyAreaEntity,
  ): StudyAreaWithRelationsDto {
    return {
      ...this.mapToResponseDto(studyArea),
      skills: studyArea.skills,
      aiInsights: studyArea.aiInsights,
      learningGoals: studyArea.learningGoals,
    };
  }
}
