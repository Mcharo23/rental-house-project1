import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { ContractType } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => ContractType)
@UseGuards(JwtAuthGuard)
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Mutation(() => ContractType, { name: 'createContract' })
  async createContract(
    @Args('createContractInput') createContractInput: CreateContractInput,
    @Context() context,
  ) {
    return await this.contractService.create(
      createContractInput,
      context.req.user,
    );
  }

  @Query(() => [ContractType], { name: 'contract' })
  findAll() {
    return this.contractService.findAll();
  }

  @Query(() => ContractType, { name: 'contract' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contractService.findOne(id);
  }

  // @Mutation(() => Contract)
  // updateContract(
  //   @Args('updateContractInput') updateContractInput: UpdateContractInput,
  // ) {
  //   return this.contractService.update(
  //     updateContractInput.HouseID,
  //     updateContractInput,
  //   );
  // }

  @Mutation(() => ContractType)
  removeContract(@Args('id', { type: () => Int }) id: number) {
    return this.contractService.remove(id);
  }
}
