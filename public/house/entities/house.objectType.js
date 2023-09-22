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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyHouseType = exports.HouseType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const contract_objectType_1 = require("../../contract/entities/contract.objectType");
const user_type_1 = require("../../users/entities/user.type");
let HouseType = exports.HouseType = class HouseType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], HouseType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "Region", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "District", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "Ward", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], HouseType.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "Description", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], HouseType.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HouseType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], HouseType.prototype, "imgUrl", void 0);
exports.HouseType = HouseType = __decorate([
    (0, graphql_1.ObjectType)()
], HouseType);
let MyHouseType = exports.MyHouseType = class MyHouseType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], MyHouseType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "Region", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "District", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "Ward", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], MyHouseType.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "Description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [contract_objectType_1.ContractType]),
    __metadata("design:type", Array)
], MyHouseType.prototype, "contract", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyHouseType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MyHouseType.prototype, "imgUrl", void 0);
exports.MyHouseType = MyHouseType = __decorate([
    (0, graphql_1.ObjectType)()
], MyHouseType);
//# sourceMappingURL=house.objectType.js.map