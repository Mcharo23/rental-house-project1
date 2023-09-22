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
exports.ContractType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const house_objectType_1 = require("../../house/entities/house.objectType");
const user_type_1 = require("../../users/entities/user.type");
let ContractType = exports.ContractType = class ContractType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ContractType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ContractType.prototype, "isCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ContractType.prototype, "Duration", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ContractType.prototype, "Total_rent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], ContractType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true, defaultValue: null }),
    __metadata("design:type", Date)
], ContractType.prototype, "Date_of_signing", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true, defaultValue: null }),
    __metadata("design:type", Date)
], ContractType.prototype, "Date_of_contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true, defaultValue: null }),
    __metadata("design:type", Date)
], ContractType.prototype, "End_of_contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => house_objectType_1.HouseType),
    __metadata("design:type", house_objectType_1.HouseType)
], ContractType.prototype, "House", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], ContractType.prototype, "Tenant", void 0);
exports.ContractType = ContractType = __decorate([
    (0, graphql_1.ObjectType)()
], ContractType);
//# sourceMappingURL=contract.objectType.js.map