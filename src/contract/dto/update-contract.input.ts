import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateContractInput {
  @Field(() => ID)
  HouseID: Types.ObjectId;

  @Field()
  Duration: string;

  @Field()
  Rent_per_terms: string;

  @Field()
  Total_rent: string;
}
