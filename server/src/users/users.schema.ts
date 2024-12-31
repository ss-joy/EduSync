import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: [true, 'User name is required'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'User email is required'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop({
    type: [String],
    enum: ['user', 'admin', 'teacher', 'student'],
    default: ['user'],
    required: [true, 'user role is required'],
  })
  roles: string[];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
