import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  middleName: string;

  @IsNotEmpty()
  @Field()
  lastname: string;

  @IsNotEmpty()
  @Field()
  gender: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phoneNumber: string;

  @IsNotEmpty()
  @Field()
  accountType: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Field()
  password: string;
}
