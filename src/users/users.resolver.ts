import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './entities/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [UserType], { name: 'users' })
  async findAll(): Promise<UserType[]> {
    return await this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async findOne(
    @Args('username', { type: () => String }) username: string,
  ): Promise<UserType> {
    const user = await this.usersService.findOne(username);

    if (user) {
      throw new NotFoundException('No active accoud found');
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
