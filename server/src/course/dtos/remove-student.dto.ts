import { IsMongoId } from 'class-validator';

export class RemoveStudentFromCourseDto {
  @IsMongoId()
  studentId: string;
}
