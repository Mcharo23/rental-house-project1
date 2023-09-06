import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/users/entities/user.type';

@ObjectType()
export class HouseType {
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
