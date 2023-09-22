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
exports.CreateHouseInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateHouseInput = exports.CreateHouseInput = class CreateHouseInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHouseInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHouseInput.prototype, "Region", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHouseInput.prototype, "District", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHouseInput.prototype, "Ward", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateHouseInput.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHouseInput.prototype, "Description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateHouseInput.prototype, "imgUrl", void 0);
exports.CreateHouseInput = CreateHouseInput = __decorate([
    (0, graphql_1.InputType)()
], CreateHouseInput);
//# sourceMappingURL=create-house.input.js.map