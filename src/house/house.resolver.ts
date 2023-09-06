import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { HouseService } from './house.service';
import { HouseType } from './entities/house.entity';
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { House } from './entities/house.schema';

@Resolver(() => HouseType)
@UseGuards(JwtAuthGuard)
export class HouseResolver {
  private readonly logger = new Logger(HouseResolver.name);
  constructor(
    private readonly houseService: HouseService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => HouseType)
  createHouse(
    @Args('createHouseInput') createHouseInput: CreateHouseInput,
    @Context() context,
  ): Promise<House> {
    return this.houseService.create(createHouseInput, context.req.user);
  }

  @Query(() => [HouseType], { name: 'houses' })
  findAll(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Query(() => [HouseType], { name: 'myHouse' })
  findMyHouses(@Context() context): Promise<House[]> {
    return this.houseService.findMyHouses(context.req.user);
  }

  @Query(() => HouseType, { name: 'house' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.houseService.findOne(id);
  }

  @Mutation(() => String)
  updateHouse(
    @Context() context,
    @Args('updateHouseInput') updateHouseInput: UpdateHouseInput,
  ): Promise<string> {
    return this.houseService.update(updateHouseInput, context.req.user);
  }

  @Mutation(() => HouseType)
  removeHouse(@Args('id', { type: () => Int }) id: number) {
    return this.houseService.remove(id);
  }
}
