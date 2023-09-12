import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  username: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsPhoneNumber()
  @Field()
  phoneNumber: string;
}
