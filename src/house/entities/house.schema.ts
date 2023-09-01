import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class House extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  Region: string;

  @Prop()
  District: string;

  @Prop()
  Ward: string;

  @Prop()
  Description: string;

  @Prop()
  status: string;

  // @Prop({ type: Types.ObjectId, ref: 'User' })
  // user: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop(() => [String])
  imgUrl: string[];
}

export const HouseSchema = SchemaFactory.createForClass(House);
