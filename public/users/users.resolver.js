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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const user_type_1 = require("./entities/user.type");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_password_input_1 = require("./dto/update-user-password.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_user_input_1 = require("./dto/update-user.input");
let UsersResolver = exports.UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(createUserInput) {
        return await this.usersService.create(createUserInput);
    }
    async findAll(context) {
        console.log(context.req.user);
        return await this.usersService.findAll();
    }
    async findOne(username) {
        const user = await this.usersService.findOne(username);
        if (user) {
            throw new common_1.NotFoundException('No active account found');
        }
        return user;
    }
    async updatePassword(updatePasswordInput, context) {
        return await this.usersService.updatePassword(updatePasswordInput, context.req.user);
    }
    async update(updateUserInput, context) {
        return await this.usersService.update(updateUserInput, context.req.user);
    }
    removeUser(id) {
        return this.usersService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_type_1.UserType], { name: 'users' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_type_1.UserType, { name: 'user' }),
    __param(0, (0, graphql_1.Args)('username', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'updatePassword' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('updatePasswordInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_password_input_1.UpdatePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updatePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'updateUser' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "removeUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_type_1.UserType),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map