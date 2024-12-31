import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({
    type: String,
    required: [true, 'Course name is required'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Course description is required'],
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  teacher: User;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: User.name,
  })
  students: User[];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
