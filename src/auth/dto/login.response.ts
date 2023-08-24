import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/users/entities/user.type';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => UserType)
  user: UserType;
}
