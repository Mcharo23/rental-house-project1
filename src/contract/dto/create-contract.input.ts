import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateContractInput {
  @Field(() => ID)
  @IsNotEmpty({ message: 'House id should not be empty' })
  House: Types.ObjectId;

  @Field()
  @IsNotEmpty({ message: 'Duration should not be empty' })
  Duration: string;

  @Field()
  @IsNotEmpty({ message: 'Price should not be empty' })
  Rent_per_terms: string;

  @Field()
  @IsNotEmpty({ message: 'Total rent should not be empty' })
  Total_rent: string;
}
