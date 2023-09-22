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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contract_service_1 = require("./contract.service");
const contract_objectType_1 = require("./entities/contract.objectType");
const create_contract_input_1 = require("./dto/create-contract.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_contract_input_1 = require("./dto/update-contract.input");
let ContractResolver = exports.ContractResolver = class ContractResolver {
    constructor(contractService) {
        this.contractService = contractService;
    }
    async createContract(createContractInput, context) {
        return await this.contractService.create(createContractInput, context.req.user);
    }
    async findAll() {
        return await this.contractService.findAll();
    }
    async findMany(context) {
        return await this.contractService.findMany(context.req.user);
    }
    async signContract(updateContractInput) {
        return await this.contractService.signContract(updateContractInput);
    }
    tenantIn(updateContractInput) {
        return this.contractService.tenantIn(updateContractInput);
    }
    tenantOut(updateContractInput) {
        return this.contractService.tenantOut(updateContractInput);
    }
    async watchContract(context) {
        return await this.contractService.watchContract(context.req.user);
    }
    removeContract(removeContractInput) {
        return this.contractService.remove(removeContractInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => contract_objectType_1.ContractType, { name: 'createContract' }),
    __param(0, (0, graphql_1.Args)('createContractInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_input_1.CreateContractInput, Object]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "createContract", null);
__decorate([
    (0, graphql_1.Query)(() => [contract_objectType_1.ContractType], { name: 'contracts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => [contract_objectType_1.ContractType], { name: 'myContract' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Mutation)(() => contract_objectType_1.ContractType, { name: 'signContract' }),
    __param(0, (0, graphql_1.Args)('updateContractInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_input_1.UpdateContractInput]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "signContract", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'tenantIn' }),
    __param(0, (0, graphql_1.Args)('updateContractInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_input_1.UpdateContractInput]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "tenantIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'tenantOut' }),
    __param(0, (0, graphql_1.Args)('updateContractInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_input_1.UpdateContractInput]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "tenantOut", null);
__decorate([
    (0, graphql_1.Query)(() => [contract_objectType_1.ContractType], { name: 'watchTenantContract' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "watchContract", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'rejectContract' }),
    __param(0, (0, graphql_1.Args)('removeContractInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_input_1.UpdateContractInput]),
    __metadata("design:returntype", Promise)
], ContractResolver.prototype, "removeContract", null);
exports.ContractResolver = ContractResolver = __decorate([
    (0, graphql_1.Resolver)(() => contract_objectType_1.ContractType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractResolver);
//# sourceMappingURL=contract.resolver.js.map