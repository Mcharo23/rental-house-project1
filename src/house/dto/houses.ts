import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.schema';

@ObjectType()
export class HouseWithOwnerDto {
  @Field()
  name: string;

  @Field()
  Region: string;

  @Field()
  District: string;

  @Field()
  Ward: string;

  @Field()
  Description: string;

  @Field()
  status: string;

  @Field(() => [String])
  imgUrl: string[];

  @Field(() => User)
  user: User;
}
