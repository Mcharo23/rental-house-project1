import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { HouseService } from './house.service';
import { HouseType, MyHouseType } from './entities/house.objectType';
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { House } from './entities/house.schema';
import { Types } from 'mongoose';

@Resolver(() => HouseType)
export class HouseResolver {
  private readonly logger = new Logger(HouseResolver.name);
  constructor(
    private readonly houseService: HouseService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => HouseType)
  @UseGuards(JwtAuthGuard)
  createHouse(
    @Args('createHouseInput') createHouseInput: CreateHouseInput,
    @Context() context,
  ): Promise<House> {
    return this.houseService.create(createHouseInput, context.req.user);
  }

  @Query(() => [HouseType], { name: 'houses' })
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Query(() => [HouseType], { name: 'demo' })
  demoHouses(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Query(() => [MyHouseType], { name: 'myHouse' })
  @UseGuards(JwtAuthGuard)
  findMyHouses(@Context() context): Promise<House[]> {
    return this.houseService.findMyHouses(context.req.user);
  }

  @Query(() => HouseType, { name: 'house' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('HoiseID', { type: () => String }) HoiseID: string) {
    return this.houseService.findOne(new Types.ObjectId(HoiseID));
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateHouse(
    @Context() context,
    @Args('updateHouseInput') updateHouseInput: UpdateHouseInput,
  ): Promise<string> {
    return this.houseService.update(updateHouseInput, context.req.user);
  }

  @Mutation(() => HouseType)
  @UseGuards(JwtAuthGuard)
  removeHouse(@Args('id', { type: () => Int }) id: number) {
    return this.houseService.remove(id);
  }
}
