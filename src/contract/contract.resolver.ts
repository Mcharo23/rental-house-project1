import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { ContractType } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateContractInput } from './dto/update-contract.input';

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

  @Query(() => [ContractType], { name: 'contracts' })
  async findAll(): Promise<ContractType[]> {
    return await this.contractService.findAll();
  }

  @Query(() => [ContractType], { name: 'myContract' })
  async findMany(@Context() context): Promise<ContractType[]> {
    return await this.contractService.findMany(context.req.user);
  }

  @Mutation(() => String, { name: 'signContract' })
  async signContract(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ): Promise<string> {
    return await this.contractService.signContract(updateContractInput);
  }

  @Mutation(() => ContractType, { name: 'update' })
  update(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ) {
    return this.contractService.update(updateContractInput);
  }

  @Mutation(() => String, { name: 'removeContract' })
  removeContract(
    @Args('removeContractInput') removeContractInput: UpdateContractInput,
  ): Promise<string> {
    return this.contractService.remove(removeContractInput);
  }
}
//6501a6a4c187249847c095e0
