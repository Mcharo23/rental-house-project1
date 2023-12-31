import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { ContractType } from './entities/contract.objectType';
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

  @Mutation(() => ContractType, { name: 'signContract' })
  async signContract(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ): Promise<ContractType> {
    return await this.contractService.signContract(updateContractInput);
  }

  @Mutation(() => String, { name: 'tenantIn' })
  tenantIn(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ): Promise<string> {
    return this.contractService.tenantIn(updateContractInput);
  }

  @Mutation(() => String, { name: 'tenantOut' })
  tenantOut(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ): Promise<string> {
    return this.contractService.tenantOut(updateContractInput);
  }

  @Query(() => [ContractType], { name: 'watchTenantContract' })
  async watchContract(@Context() context): Promise<ContractType[]> {
    return await this.contractService.watchContract(context.req.user);
  }

  @Mutation(() => String, { name: 'rejectContract' })
  removeContract(
    @Args('removeContractInput') removeContractInput: UpdateContractInput,
  ): Promise<string> {
    return this.contractService.remove(removeContractInput);
  }
}
