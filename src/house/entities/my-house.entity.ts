import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ContractType } from 'src/contract/entities/contract.entity';

@ObjectType()
export class MyHouseType {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  name: string;

  @Field()
  Region: string;

  @Field()
  District: string;

  @Field()
  Ward: string;

  @Field()
  price: number;

  @Field()
  Description: string;

  @Field(() => [ContractType])
  contract: ContractType[];

  @Field()
  status: string;

  @Field(() => [String])
  imgUrl: string[];
}
