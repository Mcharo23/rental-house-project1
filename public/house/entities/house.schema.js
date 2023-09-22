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
exports.HouseSchema = exports.House = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/entities/user.schema");
let House = exports.House = class House extends mongoose_1.Document {
};
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], House.prototype, "_id", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "Region", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "District", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "Ward", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], House.prototype, "price", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "Description", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], House.prototype, "status", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], House.prototype, "user", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: mongoose_1.Types.ObjectId, ref: 'Contract' }], default: [] }),
    __metadata("design:type", Array)
], House.prototype, "contract", void 0);
__decorate([
    (0, mongoose_2.Prop)(() => [String]),
    __metadata("design:type", Array)
], House.prototype, "imgUrl", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], House.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], House.prototype, "updatedAt", void 0);
exports.House = House = __decorate([
    (0, mongoose_2.Schema)()
], House);
exports.HouseSchema = mongoose_2.SchemaFactory.createForClass(House);
//# sourceMappingURL=house.schema.js.map