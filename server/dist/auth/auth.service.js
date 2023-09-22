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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const { password } = createUserDto, rest = __rest(createUserDto, ["password"]);
        const isEmailToken = await this.usersService.isEmailToken(createUserDto.email);
        if (isEmailToken) {
            throw new common_1.BadRequestException('email in used');
        }
        const hashedPassword = await this.usersService.hashPassword(password);
        const user = await this.usersService.create(Object.assign(Object.assign({}, rest), { password: hashedPassword }));
        return user;
    }
    async login(user) {
        console.log('authservice login >> ', user);
        const payload = { email: user.email, sub: user.id };
        const token = await this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });
        user.token = token;
        return this.usersService.save(user);
    }
    googleLogin(req) {
        return req.user;
    }
    async googleCallback(req) {
        console.log('callback');
        const user = await this.usersService.findOneByEmail(req.user.email);
        return req.user;
    }
    async googleRegister(req) {
        const u = this.googleLogin(req);
        const profile = u.getBasicProfile();
        console.log('service>> profile', profile);
        return req.user;
    }
    logout(user) {
        return this.usersService.clearToken(user);
    }
    async getAuthToken(userID) {
        const user = await this.usersService.findOneById(userID);
        return user.token;
    }
    async loginJWT(email, password) {
        const user = await this.usersService.findOne({
            email,
        });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const isMatch = await this.comparePassword(password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('wrong credentials');
        return user;
    }
    async generateAuthToken(userID) {
        const user = await this.usersService.findOneById(userID);
        const payload = { sub: user.id.toString(), email: user.email };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });
        return token;
    }
    async generateRegisterToken(userID) {
        const user = await this.usersService.findOneById(userID);
        console.log('generateRegisterToken>> user', user);
        const payload = { sub: user.id.toString() };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });
        return { token, username: `${user.firstname} ${user.lastname}` };
    }
    async comparePassword(password, hashedPassword) {
        const isMatch = await (0, bcrypt_1.compare)(password, hashedPassword);
        if (!isMatch)
            throw new common_1.UnauthorizedException('wrong credentials');
        return isMatch;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const isMatch = await this.comparePassword(password, user.password);
        console.log('auth service validateUser >> user', user, isMatch);
        if (user && isMatch) {
            return user;
        }
        return null;
    }
    async validateToken(token) {
        console.log('auth service >> token', token);
        let payload;
        try {
            payload = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('wrong token');
        }
        return payload;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map