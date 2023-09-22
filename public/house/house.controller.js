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
exports.HouseController = void 0;
const common_1 = require("@nestjs/common");
const house_service_1 = require("./house.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const config_1 = require("./config");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const fs_1 = require("fs");
let HouseController = exports.HouseController = class HouseController {
    constructor(houseService) {
        this.houseService = houseService;
    }
    async createHouse(file) {
        const imageUrls = await file.map((file) => file.filename);
        return imageUrls;
    }
    async getImage(imageName, res) {
        const imagePath = (0, path_1.join)(__dirname, '..', '..', 'images', imageName);
        res.sendFile(imagePath);
    }
    async getAllImages(res) {
        const imageDirectory = './images';
        const imageFiles = (0, fs_1.readdirSync)(imageDirectory);
        res.json(imageFiles);
    }
};
__decorate([
    (0, common_1.Post)('/upload-house-images/'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', null, config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "createHouse", null);
__decorate([
    (0, common_1.Get)('/images/:imageName'),
    __param(0, (0, common_1.Param)('imageName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "getImage", null);
__decorate([
    (0, common_1.Get)('/images'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "getAllImages", null);
exports.HouseController = HouseController = __decorate([
    (0, common_1.Controller)('house'),
    __metadata("design:paramtypes", [house_service_1.HouseService])
], HouseController);
//# sourceMappingURL=house.controller.js.map