import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/users/entities/user.type';

@ObjectType()
export class HouseType {
  @Field()
  Region: string;

  @Field()
  District: string;

  @Field()
  Ward: string;

  @Field()
  Description: string;

  @Field(() => UserType)
  user: UserType;

  @Field()
  status: string;

  @Field(() => [String])
  imgUrl: string[];
}
