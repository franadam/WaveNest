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
exports.GuitarsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const guitar_entity_1 = require("./entities/guitar.entity");
let GuitarsService = class GuitarsService {
    constructor(guitarRepo) {
        this.guitarRepo = guitarRepo;
    }
    create(createGuitarDto) {
        const guitar = this.guitarRepo.create(createGuitarDto);
        return this.guitarRepo.save(guitar);
    }
    async findAll() {
        return this.guitarRepo.find({
            relations: {
                brand: true,
            },
        });
    }
    async findAllWithParams(query) {
        const { order, sortBy, skip, limit: take, total, current, } = await this.getPagination(query);
        const guitars = await this.guitarRepo.find({
            order: { [sortBy]: order },
            skip,
            take,
            relations: {
                brand: true,
            },
        });
        return guitars;
    }
    async findOne(id) {
        const guitar = await this.guitarRepo.findOne({
            where: { id },
            relations: {
                brand: true,
            },
        });
        return guitar;
    }
    async update(id, updateGuitarDto) {
        const guitar = await this.findOne(id);
        if (!guitar)
            throw new common_1.NotFoundException('guitar not found');
        return this.guitarRepo.save(Object.assign(Object.assign({}, guitar), updateGuitarDto));
    }
    async remove(id) {
        const guitar = await this.findOne(id);
        if (!guitar)
            throw new common_1.NotFoundException('guitar not found');
        return this.guitarRepo.remove(guitar);
    }
    async countDocuments() {
        const guitars = await this.guitarRepo.find();
        return guitars.length;
    }
    async getPagination(query) {
        const order = query.order ? query.order.toUpperCase() : 'ASC';
        const sortBy = query.sortBy ? query.sortBy : 'id';
        const limit = query.limit ? parseInt(query.limit) : 10;
        const current = query.page ? parseInt(query.page) : 1;
        const skip = (current - 1) * limit;
        const count = await this.countDocuments();
        const total = Math.ceil(count / limit);
        const pagination = { order, sortBy, limit, current, skip, total };
        console.log('pagination', pagination);
        return pagination;
    }
    async shopping(filters) {
        console.log('filters', filters);
        const guitars = await this.guitarRepo
            .createQueryBuilder('guitars')
            .innerJoinAndSelect('guitars.brand', 'brands', 'brands.id IN (:...brands_ids)', {
            brands_ids: filters.brands,
        })
            .where('guitars.price BETWEEN  :minprice AND :maxprice', {
            minprice: filters.prices[0],
            maxprice: filters.prices[1],
        })
            .andWhere('guitars.frets IN (:...frets_ids)', {
            frets_ids: filters.frets,
        })
            .andWhere('guitars.shipping = :shipping ', {
            shipping: filters.shipping,
        })
            .andWhere('guitars.available > :available ', {
            available: filters.available,
        })
            .getMany();
        console.log('service >> guitars', guitars);
        console.log('service >> filters.available', filters.available);
        const filteredGuitars = guitars.filter((guitar) => {
            let isValid = true;
            for (const key in filters) {
                console.log(key, guitar[key], filters[key]);
                isValid = isValid && guitar[key] === filters[key];
            }
            return isValid;
        });
        console.log('service >> filteredGuitars', filteredGuitars);
        return guitars;
    }
};
GuitarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(guitar_entity_1.Guitar)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GuitarsService);
exports.GuitarsService = GuitarsService;
//# sourceMappingURL=guitars.service.js.map