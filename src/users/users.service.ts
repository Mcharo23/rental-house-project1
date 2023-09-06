import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from './entities/user.type';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const found = await this.findOne(createUserInput.username);

    if (found) {
      throw new ConflictException('The user already exist, please login');
    }

    const salt = await bcrypt.genSalt();

    const user = await this.userModel.create({
      _id: new Types.ObjectId(),
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password, salt),
      salt: salt,
    });

    await user.save();
    this.logger.log(user);

    return user;
  }

  async findAll(): Promise<UserType[]> {
    const users = await this.userModel.find({}).exec();

    if (users.length === 0) {
      throw new BadRequestException('No users found');
    }

    return users;
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username }).exec();

    return user;
  }

  async getManyUsers(user: string[]): Promise<UserType[]> {
    return await this.userModel.find({
      where: {
        _id: { $in: user } as any,
      },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password, salt): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
