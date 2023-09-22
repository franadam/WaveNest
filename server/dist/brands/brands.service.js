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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("./entities/brand.entity");
let BrandsService = class BrandsService {
    constructor(brandRepo) {
        this.brandRepo = brandRepo;
    }
    create(createBrandDto) {
        const brand = this.brandRepo.create(createBrandDto);
        return this.brandRepo.save(brand);
    }
    async findAll(query) {
        const order = query.order ? query.order.toUpperCase() : 'ASC';
        const sortBy = query.sortBy ? query.sortBy : 'id';
        const take = query.limit ? parseInt(query.limit) : 10;
        const skip = query.skip ? parseInt(query.skip) : 0;
        const brands = await this.brandRepo.find({
            order: { [sortBy]: order },
            skip,
            take,
        });
        return brands;
    }
    findOne(id) {
        return this.brandRepo.findOneBy({ id });
    }
    async update(id, updateBrandDto) {
        const brand = await this.brandRepo.findOneBy({ id });
        if (!brand)
            throw new common_1.NotFoundException('brand not found');
        const updated = Object.assign(Object.assign({}, brand), updateBrandDto);
        return this.brandRepo.save(updated);
    }
    async remove(id) {
        const brand = await this.brandRepo.findOneBy({ id });
        if (!brand)
            throw new common_1.NotFoundException('brand not found');
        return this.brandRepo.remove(brand);
    }
};
BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrandsService);
exports.BrandsService = BrandsService;
//# sourceMappingURL=brands.service.js.map