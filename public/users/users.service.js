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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./entities/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserInput) {
        const found = await this.findOne(createUserInput.username);
        if (found) {
            throw new common_1.ConflictException('The user already exist, please login');
        }
        const salt = await bcrypt.genSalt();
        const user = await this.userModel.create({
            _id: new mongoose_2.Types.ObjectId(),
            ...createUserInput,
            password: await this.hashPassword(createUserInput.password, salt),
            salt: salt,
        });
        await user.save();
        this.logger.log(user);
        return user;
    }
    async findAll() {
        const users = await this.userModel.find({}).exec();
        if (users.length === 0) {
            throw new common_1.BadRequestException('No users found');
        }
        return users;
    }
    async findOne(username) {
        const user = await this.userModel.findOne({ username: username }).exec();
        return user;
    }
    async getManyUsers(user) {
        return await this.userModel.find({
            where: {
                _id: { $in: user },
            },
        });
    }
    async updatePassword(updatePasswordInput, user) {
        try {
            const updateQuery = {
                username: user.username,
            };
            const salt = await this.generateSalt();
            const updateField = {
                $set: {
                    password: await this.hashPassword(updatePasswordInput.newPassword, salt),
                    salt: salt,
                },
            };
            if (await bcrypt.compare(updatePasswordInput.currentpassword, user.password)) {
                const updateResult = await this.userModel.updateOne(updateQuery, updateField);
                if (updateResult.modifiedCount > 0) {
                    this.logger.log(updateResult);
                    return 'Password successfully updated';
                }
            }
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async update(updateUserInput, user) {
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
            const updateResult = await this.userModel.updateOne(updateQuery, updateField);
            if (updateResult.modifiedCount > 0) {
                return 'data successfully updated';
            }
            throw new common_1.UnauthorizedException('You are not authorized to update these fields');
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
    async generateSalt() {
        return await bcrypt.genSalt();
    }
};
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map