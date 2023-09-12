import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Contract } from 'src/contract/entities/contract.schema';
import { House } from 'src/house/entities/house.schema';

@Schema()
export class User extends Document {
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'House' }], default: [] })
  house?: House[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'House' }], default: [] })
  contract?: Contract[];

  @IsNotEmpty()
  @Prop()
  password: string;

  @IsNotEmpty()
  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
