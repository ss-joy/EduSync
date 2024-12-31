import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { AdminGurd } from 'src/auth/admin.guard';
import { AssignTeacherDto } from './dtos/assign-teacher.dto';
import { AssignstudentsDto } from './dtos/assign-students.dto';
import { RemoveStudentFromCourseDto } from './dtos/remove-student.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourse() {
    return this.courseService.getAllCourse();
  }
  @UseGuards(AdminGurd)
  @Post()
  addCourse(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.addCourse(createCourseDto);
  }

  @Post(':id/teacher')
  assignTeacher(
    @Body(ValidationPipe) assignTeacherDto: AssignTeacherDto,
    @Param('id', ValidationPipe) id: string,
  ) {
    return this.courseService.assignTeacher(id, assignTeacherDto);
  }

  @Delete(':id/teacher')
  removeTeacher(
    @Body(ValidationPipe) assignTeacherDto: AssignTeacherDto,
    @Param('id', ValidationPipe) id: string,
  ) {
    return this.courseService.removeTeacher(id, assignTeacherDto);
  }

  @Post(':id/student')
  assignStudentsToCourse(
    @Body() assignstudentsDto: AssignstudentsDto,
    @Param('id', ValidationPipe) id: string,
  ) {
    console.log(assignstudentsDto);
    return this.courseService.assignStudentsToCourse(assignstudentsDto, id);
  }

  @Delete(':id/student')
  removeStudentFromACourse(
    @Body() removeStudentFromCourseDto: RemoveStudentFromCourseDto,
    @Param('id', ValidationPipe) id: string,
  ) {
    return this.courseService.removeStudentFromACourse(
      id,
      removeStudentFromCourseDto,
    );
  }
}
