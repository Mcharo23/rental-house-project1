import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { HouseType } from 'src/house/entities/house.entity';
import { UserType } from 'src/users/entities/user.type';

@ObjectType()
export class ContractType {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  Duration: number;

  @Field()
  Total_rent: string;

  @Field(() => Date, { nullable: true, defaultValue: null })
  Date_of_signing?: Date | null;

  @Field(() => Date, { nullable: true, defaultValue: null })
  Date_of_contract?: Date | null;

  @Field(() => Date, { nullable: true, defaultValue: null })
  End_of_contract?: Date | null;

  @Field(() => HouseType)
  House: HouseType;

  @Field(() => UserType)
  Tenant: UserType;
}
