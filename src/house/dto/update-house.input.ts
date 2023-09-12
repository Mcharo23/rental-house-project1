import { IsNotEmpty } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateHouseInput {
  @Field(() => ID)
  _id: Types.ObjectId;

  @IsNotEmpty({ message: 'Name should not be empty' })
  @Field()
  name: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @Field()
  price: number;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @Field()
  Description: string;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @Field()
  status: string;
}
