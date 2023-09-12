import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract, ContractSchema } from './entities/contract.schema';
import { UsersModule } from 'src/users/users.module';
import { HouseModule } from 'src/house/house.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
    ]),
    UsersModule,
    HouseModule,
  ],
  providers: [ContractResolver, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
