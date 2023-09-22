"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContractService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../users/entities/user.schema");
const contract_schema_1 = require("./entities/contract.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const house_schema_1 = require("../house/entities/house.schema");
const enum_1 = require("../lib/enum");
const house_service_1 = require("../house/house.service");
let ContractService = exports.ContractService = ContractService_1 = class ContractService {
    constructor(contractModel, houseModel, userModel, houseService) {
        this.contractModel = contractModel;
        this.houseModel = houseModel;
        this.userModel = userModel;
        this.houseService = houseService;
        this.logger = new common_1.Logger(ContractService_1.name);
    }
    async create(createContractInput, user) {
        try {
            const house = await this.houseService.findOne(new mongoose_1.Types.ObjectId(createContractInput.House));
            if (!house) {
                throw new common_1.NotFoundException('House not found');
            }
            if (house.status === enum_1.HouseStatus.PENDING ||
                house.status === enum_1.HouseStatus.BOOKED) {
                throw new common_1.ConflictException(`${house.status === enum_1.HouseStatus.PENDING
                    ? 'Sorry, this house has a pending request'
                    : 'Sorry, this house is booked'}`);
            }
            const contract = await this.contractModel.create({
                _id: new mongoose_1.Types.ObjectId(),
                Tenant: user,
                ...createContractInput,
                House: house,
            });
            user.contract.push(contract);
            house.contract.push(contract);
            house.status = enum_1.HouseStatus.PENDING;
            await contract.save();
            await user.save();
            await house.save();
            this.logger.log(contract);
            return contract;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findAll() {
        try {
            const contract = await this.contractModel
                .find({})
                .populate('Tenant', '')
                .populate('House', '')
                .exec();
            if (contract.length === 0) {
                throw new common_1.NotFoundException('No contract found');
            }
            this.logger.log(contract);
            return contract;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findOne(contract) {
        try {
            const found = await this.contractModel
                .findOne({
                _id: contract,
            })
                .populate('Tenant', '')
                .populate('House', '')
                .exec();
            if (!found) {
                throw new common_1.NotFoundException();
            }
            return found;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findMany(Tenant) {
        try {
            const contract = await this.contractModel
                .find({
                Tenant: Tenant._id,
            })
                .populate('Tenant', '', this.userModel)
                .populate({
                path: 'House',
                populate: [{ path: 'user', model: 'User' }],
            })
                .exec();
            if (contract.length === 0) {
                throw new common_1.NotFoundException("You don't have and contract");
            }
            this.logger.log(contract);
            return contract;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async tenantIn(updateContractInput) {
        try {
            const contract = await this.findOne(new mongoose_1.Types.ObjectId(updateContractInput.ContractID));
            if (contract.Date_of_signing === null) {
                throw new common_1.BadRequestException('Contract must be signed first');
            }
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const endOfContract = new Date(currentYear, currentMonth, currentDate.getDate());
            endOfContract.setMonth(endOfContract.getMonth() + parseInt(String(contract.Duration), 10));
            while (endOfContract.getMonth() !==
                (currentMonth + parseInt(String(contract.Duration), 10)) % 12) {
                endOfContract.setDate(endOfContract.getDate() - 1);
            }
            contract.Date_of_contract = currentDate;
            contract.End_of_contract = endOfContract;
            await contract.save();
            this.logger.log(contract);
            return `The contract starts counting on ${currentDate} and ends on ${endOfContract}`;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async tenantOut(updateContractInput) {
        try {
            const contract = await this.findOne(new mongoose_1.Types.ObjectId(updateContractInput.ContractID));
            const startDate = new Date(contract.Date_of_contract);
            const endDate = new Date(contract.End_of_contract);
            const monthsDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());
            contract.isCurrent = false;
            contract.House.status = enum_1.HouseStatus.AVAILABLE;
            await contract.save();
            await contract.House.save();
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
        return 'Successfully tenant out';
    }
    async watchContract(user) {
        try {
            const contract = await this.findMany(user);
            const contracts = [];
            contract.forEach((contract) => {
                const Date_of_contract = new Date(contract.Date_of_contract);
                const End_of_contract = new Date(contract.End_of_contract);
                const timeDifference = End_of_contract.getTime() - Date_of_contract.getTime();
                const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
                if (daysDifference >= 0 && contract.isCurrent) {
                    console.log(daysDifference);
                    contracts.push(contract);
                }
            });
            return contracts;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async signContract(updateContractInput) {
        try {
            const contract = await this.findOne(new mongoose_1.Types.ObjectId(updateContractInput.ContractID));
            const house = contract.House;
            house.status = enum_1.HouseStatus.BOOKED;
            const currentDate = new Date();
            contract.Date_of_signing = currentDate;
            await contract.save();
            await house.save();
            return contract;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async remove(updateContractInput) {
        try {
            const contract = new mongoose_1.Types.ObjectId(updateContractInput.ContractID);
            const found = await this.findOne(contract);
            const house = found.House;
            const tenant = found.Tenant;
            const indexInHouse = house.contract.findIndex((object) => object.toString() === contract.toString());
            const indexInTenant = house.contract.findIndex((object) => object.toString() === contract.toString());
            if (indexInHouse !== -1 && indexInTenant !== -1) {
                house.contract.splice(indexInHouse, 1);
                house.status = enum_1.HouseStatus.AVAILABLE;
                tenant.contract.splice(indexInTenant, 1);
                await house.save();
                await tenant.save();
                const contract = await this.contractModel.deleteOne({
                    _id: new mongoose_1.Types.ObjectId(updateContractInput.ContractID),
                });
                if (contract.deletedCount === 0) {
                    throw new common_1.NotFoundException();
                }
                return 'Contract successfully deleted';
            }
            throw new common_1.InternalServerErrorException();
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
};
exports.ContractService = ContractService = ContractService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(contract_schema_1.Contract.name)),
    __param(1, (0, mongoose_2.InjectModel)(house_schema_1.House.name)),
    __param(2, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        house_service_1.HouseService])
], ContractService);
//# sourceMappingURL=contract.service.js.map