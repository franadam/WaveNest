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
exports.CreateGuitarDto = void 0;
const class_validator_1 = require("class-validator");
const brand_entity_1 = require("../../brands/entities/brand.entity");
class CreateGuitarDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuitarDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGuitarDto.prototype, "frets", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", brand_entity_1.Brand)
], CreateGuitarDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuitarDto.prototype, "wood", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuitarDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreateGuitarDto.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(1000000),
    __metadata("design:type", Number)
], CreateGuitarDto.prototype, "price", void 0);
exports.CreateGuitarDto = CreateGuitarDto;
//# sourceMappingURL=create-guitar.dto.js.map