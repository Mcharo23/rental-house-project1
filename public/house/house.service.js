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
var HouseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const house_schema_1 = require("./entities/house.schema");
const user_schema_1 = require("../users/entities/user.schema");
const enum_1 = require("../lib/enum");
let HouseService = exports.HouseService = HouseService_1 = class HouseService {
    constructor(houseModel, userModel) {
        this.houseModel = houseModel;
        this.userModel = userModel;
        this.logger = new common_1.Logger(HouseService_1.name);
    }
    async create(createHouseInput, user) {
        try {
            const houseId = new mongoose_2.Types.ObjectId();
            const found = await this.userModel.findOne({ username: user.username });
            if (!found) {
                throw new common_1.UnauthorizedException();
            }
            const house = new this.houseModel({
                _id: houseId,
                ...createHouseInput,
                user: user,
                status: enum_1.HouseStatus.AVAILABLE,
            });
            await house.save();
            found.house.push(house);
            await found.save();
            this.logger.log(house);
            return house;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findAll() {
        try {
            const houses = await this.houseModel.find({}).populate('user', '').exec();
            if (houses.length === 0) {
                throw new common_1.NotFoundException('No house present');
            }
            this.logger.log(houses);
            return houses;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                this.logger.error(error);
                throw error;
            }
            this.logger.error(error.message);
            throw new common_1.InternalServerErrorException('An error occurred while fetching houses');
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
                throw new common_1.NotFoundException('No house present');
            }
            this.logger.log(houses);
            return houses;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                this.logger.error(error);
                throw error;
            }
            this.logger.error(error.message);
            throw new common_1.InternalServerErrorException('An error occurred while fetching houses');
        }
    }
    async findMyHouses(user) {
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
                throw new common_1.NotFoundException('No house present');
            }
            this.logger.log(houses);
            return houses;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findOne(houseId) {
        const house = await this.houseModel.findOne({
            _id: houseId,
        });
        if (!house) {
            throw new common_1.NotFoundException('House not found');
        }
        return house;
    }
    async update(updateHouseInput, user) {
        try {
            const updateQuery = {
                _id: new mongoose_2.Types.ObjectId(updateHouseInput._id),
                user: user._id,
            };
            const updateFields = {
                $set: {
                    name: updateHouseInput.name,
                    price: updateHouseInput.price,
                    Description: updateHouseInput.Description,
                },
            };
            const updateResult = await this.houseModel.updateOne(updateQuery, updateFields);
            if (updateResult.modifiedCount > 0) {
                this.logger.log(updateResult);
                return `Data successfully updated`;
            }
            throw new common_1.UnauthorizedException('You are not authorized to edit this house');
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    remove(id) {
        return `This action removes a #${id} house`;
    }
};
exports.HouseService = HouseService = HouseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(house_schema_1.House.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HouseService);
//# sourceMappingURL=house.service.js.map