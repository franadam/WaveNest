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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./Guards/jwt.guard");
const local_guard_1 = require("./Guards/local.guard");
const email_service_1 = require("../email/email.service");
const google_guard_1 = require("./Guards/google.guard");
let AuthController = class AuthController {
    constructor(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    async register(body, session) {
        const user = await this.authService.register(body);
        session.userID = user.id;
        const token = await this.authService.generateAuthToken(user.id);
        session['x-access-token'] = token;
        session.b = token;
        await this.emailService.registerEmail(user.id, user.email);
        user.token = token;
        return user;
    }
    async googleRegister(req) {
        console.log('auth controller google >> req.user', req.user);
        return this.authService.googleRegister(req);
    }
    async googleLogin(req) {
        console.log('auth controller google >> req.user', req.user);
        return this.authService.googleLogin(req);
    }
    async googleCallback(req) {
        console.log('auth controller google >> callback', req.user);
        return this.authService.googleCallback(req);
    }
    async login(req, session) {
        console.log('login', req.user);
        const token = await this.authService.getAuthToken(req.user.id);
        req.session['x-access-token'] = token;
        session.a = token;
        return this.authService.login(req.user);
    }
    getProfile(req) {
        return req.user;
    }
    isAuth(req) {
        console.log('isauth', req.user.token);
        return this.authService.getAuthToken(req.user.id);
    }
    logout(req) {
        const user = req.user;
        req.user = undefined;
        console.log('logout user', user);
        return this.authService.logout(user);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    (0, common_1.Get)('/register/google'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRegister", null);
__decorate([
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    (0, common_1.Get)('/login/google'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    (0, common_1.Get)('/google/callback'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/token'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "isAuth", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_service_1.EmailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map