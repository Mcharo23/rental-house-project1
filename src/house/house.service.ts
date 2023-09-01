import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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
  ) {}

  async create(createHouseInput: CreateHouseInput, user: User): Promise<House> {
    try {
      const newHouse = new this.houseModel({
        _id: new Types.ObjectId(),
        ...createHouseInput,
        user: user,
      });

      const savedHouse = await newHouse.save();

      this.logger.log(savedHouse);

      return savedHouse;
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

  findOne(id: number) {
    return `This action returns a #${id} house`;
  }

  update(id: number, updateHouseInput: UpdateHouseInput) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
