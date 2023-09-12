import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.schema';
import { Contract } from 'src/contract/entities/contract.schema';

@Schema()
export class House extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  Region: string;

  @Prop()
  District: string;

  @Prop()
  Ward: string;

  @Prop()
  price: number;

  @Prop()
  Description: string;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'House' }], default: [] })
  contract?: Contract[];

  @Prop(() => [String])
  imgUrl: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const HouseSchema = SchemaFactory.createForClass(House);
