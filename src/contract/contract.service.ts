import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
import { User } from 'src/users/entities/user.schema';
import { Contract } from './entities/contract.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { House } from 'src/house/entities/house.schema';
import { HouseStatus } from 'src/lib/enum';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);
  constructor(
    @InjectModel(Contract.name) private readonly contractModel: Model<Contract>,
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createContractInput: CreateContractInput,
    user: User,
  ): Promise<Contract> {
    try {
      const house = await this.houseModel.findOne({
        _id: new Types.ObjectId(createContractInput.HouseID),
      });

      if (!house) {
        throw new NotFoundException('House not found');
      }

      if (house.status === HouseStatus.BOOKED) {
        throw new ConflictException('Sorry, the house has already booked');
      }

      const contract = await this.contractModel.create({
        _id: new Types.ObjectId(),
        HouseID: house,
        TenantID: user,
        ...createContractInput,
      });

      user.contract.push(contract);
      house.contract.push(contract);
      house.status = HouseStatus.BOOKED;

      await contract.save();
      await user.save();
      await house.save();

      this.logger.log(contract);
      return contract;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractInput: UpdateContractInput) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
