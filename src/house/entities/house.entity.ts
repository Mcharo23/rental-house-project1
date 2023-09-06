import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { UserType } from 'src/users/entities/user.type';

@ObjectType()
export class HouseType {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  name: string;

  @Field()
  Region: string;

  @Field()
  District: string;

  @Field()
  Ward: string;

  @Field()
  price: number;

  @Field()
  Description: string;

  @Field(() => UserType)
  user: UserType;

  @Field()
  status: string;

  @Field(() => [String])
  imgUrl: string[];
}
