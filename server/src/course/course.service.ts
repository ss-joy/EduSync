import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dtos/create-course.dto';
import { AssignTeacherDto } from './dtos/assign-teacher.dto';
import { AssignstudentsDto } from './dtos/assign-students.dto';
import { RemoveStudentFromCourseDto } from './dtos/remove-student.dto';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  getAllCourse() {
    return this.courseRepository.getAllCourse();
  }
  addCourse(createCourseDto: CreateCourseDto) {
    return this.courseRepository.addCourse(createCourseDto);
  }

  assignTeacher(id: string, assignTeacherDto: AssignTeacherDto) {
    return this.courseRepository.assignTeacher(id, assignTeacherDto);
  }

  removeTeacher(id: string, assignTeacherDto: AssignTeacherDto) {
    return this.courseRepository.removeTeacher(id, assignTeacherDto);
  }

  assignStudentsToCourse(assignstudentsDto: AssignstudentsDto, id: string) {
    return this.courseRepository.assignStudentsToCourse(assignstudentsDto, id);
  }

  removeStudentFromACourse(
    id: string,
    removeStudentFromCourseDto: RemoveStudentFromCourseDto,
  ) {
    return this.courseRepository.removeStudentFromACourse(
      id,
      removeStudentFromCourseDto,
    );
  }
}
