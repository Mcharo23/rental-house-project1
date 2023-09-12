import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class ContractType {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  Duration: string;

  @Field()
  Rent_per_terms: string;

  @Field()
  Total_rent: string;
}
