import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
import { User } from 'src/users/entities/user.schema';
import { Contract } from './entities/contract.schema';
import { Model, Types } from 'mongoose';
import { House } from 'src/house/entities/house.schema';
import { HouseService } from 'src/house/house.service';
export declare class ContractService {
    private readonly contractModel;
    private readonly houseModel;
    private readonly userModel;
    private readonly houseService;
    private readonly logger;
    constructor(contractModel: Model<Contract>, houseModel: Model<House>, userModel: Model<User>, houseService: HouseService);
    create(createContractInput: CreateContractInput, user: User): Promise<Contract>;
    findAll(): Promise<Contract[]>;
    findOne(contract: Types.ObjectId): Promise<Contract>;
    findMany(Tenant: User): Promise<Contract[]>;
    tenantIn(updateContractInput: UpdateContractInput): Promise<string>;
    tenantOut(updateContractInput: UpdateContractInput): Promise<string>;
    watchContract(user: User): Promise<Contract[]>;
    signContract(updateContractInput: UpdateContractInput): Promise<Contract>;
    remove(updateContractInput: UpdateContractInput): Promise<string>;
}
