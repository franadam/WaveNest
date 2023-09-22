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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findOne(options) {
        const user = await this.userRepo.findOne({ where: Object.assign({}, options) });
        console.log('service >>user', user);
        return user;
    }
    create(createUserDto) {
        console.log('createUserDto', createUserDto);
        const user = this.userRepo.create(createUserDto);
        return this.userRepo.save(user);
    }
    save(user) {
        return this.userRepo.save(user);
    }
    clearToken(user) {
        user.token = '';
        return this.userRepo.save(user);
    }
    async findAll() {
        const users = await this.userRepo.find();
        return users;
    }
    findOneById(id) {
        if (!id)
            return null;
        const user = this.userRepo.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return user;
    }
    findOneByEmail(email) {
        return this.userRepo.findOne({ where: [{ email }, { username: email }] });
    }
    async update(id, updateUserDto) {
        const user = await this.findOneById(id);
        let updateted = Object.assign(Object.assign({}, user), updateUserDto);
        if (updateUserDto.password) {
            const hash = await this.hashPassword(updateUserDto.password);
            updateted = Object.assign(Object.assign({}, updateted), { password: hash });
        }
        if (updateUserDto.email) {
            await this.updateEmail(id, updateUserDto.email);
        }
        console.log('service >> userS', updateted);
        return this.userRepo.save(updateted);
    }
    async updateEmail(id, email) {
        const user = await this.findOneById(id);
        const isEmailToken = await this.isEmailToken(email);
        if (isEmailToken) {
            throw new common_1.BadRequestException('email token');
        }
        return this.userRepo.save(Object.assign(Object.assign({}, user), { email, verified: false }));
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async hashPassword(password) {
        const salt = await (0, bcrypt_1.genSalt)(8);
        const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
        return hashedPassword;
    }
    async isEmailToken(email) {
        const usedEmail = await this.findOneByEmail(email);
        return !!usedEmail;
    }
    async verifyAccount(userID) {
        const user = await this.findOneById(+userID);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        if (user.verified)
            throw new common_1.BadRequestException('already verefied');
        user.verified = true;
        return this.userRepo.save(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map