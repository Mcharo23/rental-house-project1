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
import { HouseStatus } from 'src/lib/enum';

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
        status: HouseStatus.AVAILABLE,
      });

      await house.save();

      found.house.push(house);
      await found.save();

      this.logger.log(house);

      return house;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async insertImages(
    file: Array<Express.Multer.File>,
    user: User,
  ): Promise<string> {
    console.log(file);
    return await 'success';
  }

  async findAll() {
    try {
      const houses = await this.houseModel.find({}).populate('user', '').exec();
      if (houses.length === 0) {
        throw new NotFoundException('No house present');
      }
      this.logger.log(houses);

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

  async demoHouses() {
    try {
      const houses = await this.houseModel
        .find({})
        .limit(10)
        .populate('user', '', this.userModel)
        .exec();
      if (houses.length === 0) {
        throw new NotFoundException('No house present');
      }

      this.logger.log(houses);
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
        .populate({
          path: 'contract',
          populate: [
            { path: 'Tenant', model: 'User' },
            { path: 'House', model: 'House' },
          ],
        })
        .exec();

      if (houses.length === 0) {
        throw new NotFoundException('No house present');
      }

      this.logger.log(houses);

      return houses;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findOne(houseId: Types.ObjectId): Promise<House> {
    const house = await this.houseModel.findOne({
      _id: houseId,
    });

    if (!house) {
      throw new NotFoundException('House not found');
    }

    return house;
  }

  async update(
    updateHouseInput: UpdateHouseInput,
    user: User,
  ): Promise<string> {
    try {
      const updateQuery = {
        _id: new Types.ObjectId(updateHouseInput._id),
        user: user._id,
      };

      const updateFields = {
        $set: {
          name: updateHouseInput.name,
          price: updateHouseInput.price,
          Description: updateHouseInput.Description,
        },
      };

      const updateResult = await this.houseModel.updateOne(
        updateQuery,
        updateFields,
      );

      if (updateResult.modifiedCount > 0) {
        this.logger.log(updateResult);
        return `Data successfully updated`;
      }

      throw new UnauthorizedException(
        'You are not authorized to edit this house',
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
