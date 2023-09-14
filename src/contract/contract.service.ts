import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import { HouseService } from 'src/house/house.service';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);
  constructor(
    @InjectModel(Contract.name) private readonly contractModel: Model<Contract>,
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly houseService: HouseService,
  ) {}

  async create(
    createContractInput: CreateContractInput,
    user: User,
  ): Promise<Contract> {
    try {
      const house = await this.houseService.findOne(
        new Types.ObjectId(createContractInput.House),
      );

      if (!house) {
        throw new NotFoundException('House not found');
      }

      if (house.status === HouseStatus.BOOKED) {
        throw new ConflictException('Sorry, the house has already booked');
      }

      const contract = await this.contractModel.create({
        _id: new Types.ObjectId(),
        Tenant: user,
        ...createContractInput,
        House: house,
      });

      user.contract.push(contract);
      house.contract.push(contract);
      // house.status = HouseStatus.BOOKED;

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

  async findAll(): Promise<Contract[]> {
    try {
      const contract = await this.contractModel
        .find({})
        .populate('Tenant', '')
        .populate('House', '')
        .exec();

      if (contract.length === 0) {
        throw new NotFoundException('No contract found');
      }

      this.logger.log(contract);

      return contract;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findOne(contract: Types.ObjectId): Promise<Contract> {
    try {
      const found = await this.contractModel
        .findOne({
          _id: contract,
        })
        .populate('Tenant', '')
        .populate('House', '')
        .exec();

      if (!found) {
        throw new NotFoundException();
      }

      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findMany(Tenant: User): Promise<Contract[]> {
    try {
      const contract = await this.contractModel
        .find({
          Tenant: Tenant._id,
        })
        .populate('Tenant', '', this.userModel)
        .populate('House', '', this.houseModel)
        .exec();

      if (contract.length === 0) {
        throw new NotFoundException("You don't have and contract");
      }

      this.logger.log(contract);
      return contract;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async update(updateContractInput: UpdateContractInput) {
    try {
      const contract = await this.findOne(
        new Types.ObjectId(updateContractInput.ContractID),
      );

      if (contract.Date_of_signing === null) {
        throw new BadRequestException('Contract must be signed first');
      }

      // Calculate End_of_contract based on Duration
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const endOfContract = new Date(
        currentYear,
        currentMonth,
        currentDate.getDate(),
      );

      // Adding the duration to the current date
      endOfContract.setMonth(
        endOfContract.getMonth() + parseInt(contract.Duration, 10),
      );

      // Adjust the end date based on varying month lengths
      while (
        endOfContract.getMonth() !==
        (currentMonth + parseInt(contract.Duration, 10)) % 12
      ) {
        endOfContract.setDate(endOfContract.getDate() - 1);
      }

      contract.Date_of_contract = currentDate;
      contract.End_of_contract = endOfContract;

      await contract.save();

      return contract;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async signContract(
    updateContractInput: UpdateContractInput,
  ): Promise<string> {
    try {
      const contract = await this.findOne(
        new Types.ObjectId(updateContractInput.ContractID),
      );

      const currentDate = new Date();
      contract.Date_of_signing = currentDate;

      await contract.save();
      return 'The contract has been signed successfully';
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async remove(updateContractInput: UpdateContractInput): Promise<string> {
    try {
      const contract = new Types.ObjectId(updateContractInput.ContractID);

      const found = await this.findOne(contract);

      const house = found.House;
      const tenant = found.Tenant;

      const indexInHouse = house.contract.findIndex(
        (object) => object.toString() === contract.toString(),
      );

      const indexInTenant = house.contract.findIndex(
        (object) => object.toString() === contract.toString(),
      );

      if (indexInHouse !== -1 && indexInTenant !== -1) {
        house.contract.splice(indexInHouse, 1);
        tenant.contract.splice(indexInTenant, 1);

        await house.save();
        await tenant.save();

        const contract = await this.contractModel.deleteOne({
          _id: new Types.ObjectId(updateContractInput.ContractID),
        });

        if (contract.deletedCount === 0) {
          throw new NotFoundException();
        }

        return 'Contract successfully deleted';
      }

      throw new InternalServerErrorException();
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
