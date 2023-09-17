import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { House } from 'src/house/entities/house.schema';
import { User } from 'src/users/entities/user.schema';

@Schema()
export class Contract extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ default: true })
  isCurrent: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  Tenant: User;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  House: House;

  @Prop()
  Duration: number;

  @Prop({ type: Date, default: null })
  Date_of_signing?: Date | null;

  @Prop({ type: Date, default: null })
  Date_of_contract?: Date | null;

  @Prop({ type: Date, default: null })
  End_of_contract?: Date | null;

  @Prop()
  Total_rent: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
