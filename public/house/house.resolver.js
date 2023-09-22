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
var HouseResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const house_service_1 = require("./house.service");
const house_objectType_1 = require("./entities/house.objectType");
const create_house_input_1 = require("./dto/create-house.input");
const update_house_input_1 = require("./dto/update-house.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("mongoose");
let HouseResolver = exports.HouseResolver = HouseResolver_1 = class HouseResolver {
    constructor(houseService, userService) {
        this.houseService = houseService;
        this.userService = userService;
        this.logger = new common_1.Logger(HouseResolver_1.name);
    }
    createHouse(createHouseInput, context) {
        return this.houseService.create(createHouseInput, context.req.user);
    }
    findAll() {
        return this.houseService.findAll();
    }
    demoHouses() {
        return this.houseService.findAll();
    }
    findMyHouses(context) {
        return this.houseService.findMyHouses(context.req.user);
    }
    findOne(HoiseID) {
        return this.houseService.findOne(new mongoose_1.Types.ObjectId(HoiseID));
    }
    updateHouse(context, updateHouseInput) {
        return this.houseService.update(updateHouseInput, context.req.user);
    }
    removeHouse(id) {
        return this.houseService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => house_objectType_1.HouseType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('createHouseInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_house_input_1.CreateHouseInput, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "createHouse", null);
__decorate([
    (0, graphql_1.Query)(() => [house_objectType_1.HouseType], { name: 'houses' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => [house_objectType_1.HouseType], { name: 'demo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "demoHouses", null);
__decorate([
    (0, graphql_1.Query)(() => [house_objectType_1.MyHouseType], { name: 'myHouse' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "findMyHouses", null);
__decorate([
    (0, graphql_1.Query)(() => house_objectType_1.HouseType, { name: 'house' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('HoiseID', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HouseResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('updateHouseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_house_input_1.UpdateHouseInput]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "updateHouse", null);
__decorate([
    (0, graphql_1.Mutation)(() => house_objectType_1.HouseType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseResolver.prototype, "removeHouse", null);
exports.HouseResolver = HouseResolver = HouseResolver_1 = __decorate([
    (0, graphql_1.Resolver)(() => house_objectType_1.HouseType),
    __metadata("design:paramtypes", [house_service_1.HouseService,
        users_service_1.UsersService])
], HouseResolver);
//# sourceMappingURL=house.resolver.js.map