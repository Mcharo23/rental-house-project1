import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateContractInput {
  @Field(() => ID)
  ContractID: Types.ObjectId;
}
