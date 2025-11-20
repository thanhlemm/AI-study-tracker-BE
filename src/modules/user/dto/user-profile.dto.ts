export class UserProfileDto {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  timezone: string;
  studyGoal: string;
  availableHoursPerWeek: number;
  preferredStudyTimes: string[];
  createdAt: Date;
  updatedAt: Date;

  // Statistics (optional)
  totalStudySessions?: number;
  totalStudyHours?: number;
  totalStudyAreas?: number;
}
