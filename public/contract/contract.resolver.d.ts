import { ContractService } from './contract.service';
import { ContractType } from './entities/contract.objectType';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
export declare class ContractResolver {
    private readonly contractService;
    constructor(contractService: ContractService);
    createContract(createContractInput: CreateContractInput, context: any): Promise<import("./entities/contract.schema").Contract>;
    findAll(): Promise<ContractType[]>;
    findMany(context: any): Promise<ContractType[]>;
    signContract(updateContractInput: UpdateContractInput): Promise<ContractType>;
    tenantIn(updateContractInput: UpdateContractInput): Promise<string>;
    tenantOut(updateContractInput: UpdateContractInput): Promise<string>;
    watchContract(context: any): Promise<ContractType[]>;
    removeContract(removeContractInput: UpdateContractInput): Promise<string>;
}
