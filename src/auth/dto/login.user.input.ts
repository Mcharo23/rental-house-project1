import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
