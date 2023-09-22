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
exports.Guitar = void 0;
const typeorm_1 = require("typeorm");
const brand_entity_1 = require("../../brands/entities/brand.entity");
let Guitar = class Guitar {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Guitar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 250 }),
    __metadata("design:type", String)
], Guitar.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand),
    (0, typeorm_1.JoinColumn)({ name: 'brand_id' }),
    __metadata("design:type", brand_entity_1.Brand)
], Guitar.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Guitar.prototype, "frets", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guitar.prototype, "wood", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guitar.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Guitar.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Guitar.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Guitar.prototype, "itemSold", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Guitar.prototype, "shipping", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [{ id: '', url: '' }] }),
    __metadata("design:type", Array)
], Guitar.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Guitar.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Guitar.prototype, "updated_at", void 0);
Guitar = __decorate([
    (0, typeorm_1.Entity)()
], Guitar);
exports.Guitar = Guitar;
//# sourceMappingURL=guitar.entity.js.map