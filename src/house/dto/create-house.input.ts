import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHouseInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  Region: string;

  @IsNotEmpty()
  @Field()
  District: string;

  @IsNotEmpty()
  @Field()
  Ward: string;

  @IsNotEmpty()
  @Field()
  price: number;

  @IsNotEmpty()
  @Field()
  Description: string;

  @IsArray()
  @Field(() => [String])
  imgUrl: string[];
}
