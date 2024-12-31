import { IsEnum } from 'class-validator';

export enum UserRole {
  admin = 'admin',
  user = 'user',
  teacher = 'teacher',
  student = 'student',
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  userRole: UserRole;
}
