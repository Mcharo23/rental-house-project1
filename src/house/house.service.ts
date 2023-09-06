import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { House } from './entities/house.schema';
import { User } from 'src/users/entities/user.schema';

@Injectable()
export class HouseService {
  private logger = new Logger(HouseService.name);
  constructor(
    @InjectModel(House.name)
    private readonly houseModel: Model<House>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createHouseInput: CreateHouseInput, user: User): Promise<House> {
    try {
      const houseId = new Types.ObjectId();

      const found = await this.userModel.findOne({ username: user.username });

      if (!found) {
        throw new UnauthorizedException();
      }

      const house = new this.houseModel({
        _id: houseId,
        ...createHouseInput,
        user: user,
      });

      await house.save();

      found.house.push(houseId);
      await found.save();

      this.logger.log(house._id);

      return house;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findAll() {
    try {
      const houses = await this.houseModel.find({}).populate('user', '').exec();
      console.log(houses);
      if (houses.length === 0) {
        throw new NotFoundException('No house present');
      }

      return houses;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error);
        throw error;
      }

      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'An error occurred while fetching houses',
      );
    }
  }

  async findMyHouses(user: User): Promise<House[]> {
    try {
      const houses = await this.houseModel
        .find({ user: user._id })
        .populate('user')
        .exec();
      this.logger.log(houses);

      if (houses.length === 0) {
        throw new NotFoundException('No house present');
      }

      return houses;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  findOne(houseId: number) {
    return `This action returns a #house`;
  }

  async update(
    updateHouseInput: UpdateHouseInput,
    user: User,
  ): Promise<string> {
    try {
      const house = await this.houseModel.findOne({
        _id: new Types.ObjectId(updateHouseInput._id),
      });

      if (house && house.user.equals(user._id)) {
        house.name = updateHouseInput.name;
        house.price = updateHouseInput.price;
        house.status = updateHouseInput.status;
        house.Description = updateHouseInput.Description;

        try {
          await house.save();
          this.logger.log(house);
          return `Data successfully updated`;
        } catch (error) {
          this.logger.error(error);
          throw error;
        }
      }

      throw new UnauthorizedException(
        'you are not authorized to edit this house',
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
