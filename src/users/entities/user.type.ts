import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  middleName: string;

  @Field()
  lastname: string;

  @Field()
  gender: string;

  @Field()
  phoneNumber: string;

  @Field()
  accountType: string;
}
