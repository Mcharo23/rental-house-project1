import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field()
  @IsNotEmpty({ message: 'current password should not be empty' })
  currentpassword: string;

  @Field()
  @IsNotEmpty({ message: 'new password should not be empty' })
  @IsStrongPassword()
  newPassword: string;
}
