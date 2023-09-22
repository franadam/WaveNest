"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarsModule = void 0;
const common_1 = require("@nestjs/common");
const guitars_service_1 = require("./guitars.service");
const guitars_controller_1 = require("./guitars.controller");
const typeorm_1 = require("@nestjs/typeorm");
const guitar_entity_1 = require("./entities/guitar.entity");
const images_service_1 = require("../images/images.service");
let GuitarsModule = class GuitarsModule {
};
GuitarsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([guitar_entity_1.Guitar])],
        controllers: [guitars_controller_1.GuitarsController],
        providers: [guitars_service_1.GuitarsService, images_service_1.ImagesService],
    })
], GuitarsModule);
exports.GuitarsModule = GuitarsModule;
//# sourceMappingURL=guitars.module.js.map