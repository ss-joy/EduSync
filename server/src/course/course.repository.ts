import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateCourseDto } from './dtos/create-course.dto';
import { AssignTeacherDto } from './dtos/assign-teacher.dto';
import { AssignstudentsDto } from './dtos/assign-students.dto';
import { RemoveStudentFromCourseDto } from './dtos/remove-student.dto';

@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  getAllCourse() {
    return this.courseModel.find().populate('teacher').populate('students');
  }
  addCourse(createCourseDto: CreateCourseDto) {
    return this.courseModel.create({
      name: createCourseDto.name,
      description: createCourseDto.description,
    });
  }
  assignTeacher(id: string, assignTeacherDto: AssignTeacherDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid mongodb id');

    return this.courseModel.findByIdAndUpdate(id, {
      teacher: assignTeacherDto.teacherId,
    });
  }

  removeTeacher(id: string, _assignTeacherDto: AssignTeacherDto) {
    console.log(_assignTeacherDto);

    if (!isValidObjectId(id))
      throw new BadRequestException('invalid mongodb id');

    return this.courseModel.findByIdAndUpdate(id, {
      teacher: null,
    });
  }

  assignStudentsToCourse(assignstudentsDto: AssignstudentsDto, id: string) {
    return this.courseModel.findByIdAndUpdate(id, {
      $push: {
        students: {
          $each: assignstudentsDto.studentIds,
        },
      },
    });
  }

  removeStudentFromACourse(
    id: string,
    removeStudentFromCourseDto: RemoveStudentFromCourseDto,
  ) {
    return this.courseModel.findByIdAndUpdate(id, {
      $pull: {
        students: removeStudentFromCourseDto.studentId,
      },
    });
  }
}
