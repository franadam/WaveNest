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
exports.GuitarsController = void 0;
const common_1 = require("@nestjs/common");
const guitars_service_1 = require("./guitars.service");
const create_guitar_dto_1 = require("./dto/create-guitar.dto");
const update_guitar_dto_1 = require("./dto/update-guitar.dto");
const jwt_guard_1 = require("../auth/Guards/jwt.guard");
const nest_access_control_1 = require("nest-access-control");
const platform_express_1 = require("@nestjs/platform-express");
const images_service_1 = require("../images/images.service");
const sharp = require('sharp');
let GuitarsController = class GuitarsController {
    constructor(guitarsService, imagesService) {
        this.guitarsService = guitarsService;
        this.imagesService = imagesService;
    }
    create(createGuitarDto) {
        return this.guitarsService.create(createGuitarDto);
    }
    findAll(query) {
        const hasQuery = Object.keys(query).length;
        if (!hasQuery)
            return this.guitarsService.findAll();
        else
            return this.guitarsService.findAllWithParams(query);
    }
    getPagination(query) {
        return this.guitarsService.getPagination(query);
    }
    shopping(filters) {
        console.log('controller >> filters', filters);
        return this.guitarsService.shopping(filters);
    }
    async uploadFile(file) {
        const buffer = await sharp(file.buffer)
            .png()
            .toBuffer();
        const upload = await this.imagesService.cloudStorage(buffer);
        return upload;
    }
    findOne(id) {
        return this.guitarsService.findOne(+id);
    }
    update(id, updateGuitarDto) {
        return this.guitarsService.update(+id, updateGuitarDto);
    }
    remove(id, req) {
        console.log('controller >> guittar', req.user);
        return this.guitarsService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'guitars',
        action: 'create',
        possession: 'any',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guitar_dto_1.CreateGuitarDto]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "getPagination", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/shop'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "shopping", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'guitars',
        action: 'create',
        possession: 'any',
    }),
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuitarsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'guitars',
        action: 'update',
        possession: 'any',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_guitar_dto_1.UpdateGuitarDto]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'guitars',
        action: 'delete',
        possession: 'any',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GuitarsController.prototype, "remove", null);
GuitarsController = __decorate([
    (0, common_1.Controller)('/api/guitars'),
    __metadata("design:paramtypes", [guitars_service_1.GuitarsService,
        images_service_1.ImagesService])
], GuitarsController);
exports.GuitarsController = GuitarsController;
//# sourceMappingURL=guitars.controller.js.map