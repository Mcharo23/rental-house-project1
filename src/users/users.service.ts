import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-user-password.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from './entities/user.type';
import { UpdateUserInput } from './dto/update-user.input';

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

  async updatePassword(
    updatePasswordInput: UpdatePasswordInput,
    user: User,
  ): Promise<string> {
    try {
      const updateQuery = {
        username: user.username,
      };

      const salt = await this.generateSalt();

      const updateField = {
        $set: {
          password: await this.hashPassword(
            updatePasswordInput.newPassword,
            salt,
          ),
          salt: salt,
        },
      };

      if (
        await bcrypt.compare(updatePasswordInput.currentpassword, user.password)
      ) {
        const updateResult = await this.userModel.updateOne(
          updateQuery,
          updateField,
        );

        if (updateResult.modifiedCount > 0) {
          this.logger.log(updateResult);

          return 'Password successfully updated';
        }
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(updateUserInput: UpdateUserInput, user: User): Promise<string> {
    try {
      const updateQuery = {
        username: user.username,
      };

      const updateField = {
        $set: {
          username: updateUserInput.username,
          phoneNumber: updateUserInput.phoneNumber,
        },
      };

      const updateResult = await this.userModel.updateOne(
        updateQuery,
        updateField,
      );

      if (updateResult.modifiedCount > 0) {
        return 'data successfully updated';
      }

      throw new UnauthorizedException(
        'You are not authorized to update these fields',
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
}
