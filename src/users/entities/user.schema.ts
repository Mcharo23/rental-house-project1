import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  username: string;

  @IsNotEmpty()
  @Prop()
  firstName: string;

  @IsNotEmpty()
  @Prop()
  middleName: string;

  @IsNotEmpty()
  @Prop()
  lastname: string;

  @IsNotEmpty()
  @Prop()
  gender: string;

  @IsPhoneNumber()
  @Prop()
  phoneNumber: string;

  @IsNotEmpty()
  @Prop()
  accountType: string;

  @IsNotEmpty()
  @Prop()
  password: string;

  @IsNotEmpty()
  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
