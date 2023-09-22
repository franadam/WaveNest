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
exports.UpdateGuitarDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const brand_entity_1 = require("../../brands/entities/brand.entity");
const create_guitar_dto_1 = require("./create-guitar.dto");
class UpdateGuitarDto extends (0, mapped_types_1.PartialType)(create_guitar_dto_1.CreateGuitarDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGuitarDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateGuitarDto.prototype, "frets", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", brand_entity_1.Brand)
], UpdateGuitarDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGuitarDto.prototype, "wood", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGuitarDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], UpdateGuitarDto.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(1000000),
    __metadata("design:type", Number)
], UpdateGuitarDto.prototype, "price", void 0);
exports.UpdateGuitarDto = UpdateGuitarDto;
//# sourceMappingURL=update-guitar.dto.js.map