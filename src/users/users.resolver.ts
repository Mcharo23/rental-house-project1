import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './entities/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [UserType], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context): Promise<UserType[]> {
    console.log(context.req.user);
    return await this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async findOne(
    @Args('username', { type: () => String }) username: string,
  ): Promise<UserType> {
    const user = await this.usersService.findOne(username);

    if (user) {
      throw new NotFoundException('No active account found');
    }
    return user;
  }

  @Mutation(() => UserType)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserType)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
