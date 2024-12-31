import { IsArray } from 'class-validator';

export class AssignstudentsDto {
  @IsArray({
    each: true,
  })
  studentIds: string[];
}
