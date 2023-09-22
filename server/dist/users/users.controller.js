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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const roles_decorator_1 = require("./decorators/roles.decorator");
const roles_guard_1 = require("./guards/roles.guard");
const jwt_guard_1 = require("../auth/Guards/jwt.guard");
const nest_access_control_1 = require("nest-access-control");
const auth_service_1 = require("../auth/auth.service");
const email_service_1 = require("../email/email.service");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const user_dto_1 = require("./dto/user.dto");
let UsersController = class UsersController {
    constructor(usersService, authService, emailService) {
        this.usersService = usersService;
        this.authService = authService;
        this.emailService = emailService;
    }
    testy(req) {
        return 'admin';
    }
    getProfile(req, userRoles) {
        console.log('userRoles', userRoles);
        return this.usersService.findOneById(req.user.id);
    }
    async findAll() {
        const users = await this.usersService.findAll();
        return users;
    }
    async verifyAccount({ validation }) {
        const payload = await this.authService.validateToken(validation);
        return this.usersService.verifyAccount(payload.sub);
    }
    findOne(id) {
        return this.usersService.findOneById(+id);
    }
    update(id, updateUserDto) {
        console.log('controller >> updateUserDto', updateUserDto);
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
    async updateEmail(id, body, session) {
        const user = await this.usersService.updateEmail(+id, Object.keys(body)[0]);
        const token = await this.authService.generateAuthToken(+id);
        session['x-access-token'] = token;
        user.token = token;
        const updated = await this.usersService.save(user);
        console.log('ctr user>> updated', updated);
        await this.emailService.registerEmail(user.id, user.email);
        return updated;
    }
};
__decorate([
    (0, common_1.Get)('/admin'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "testy", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'profile',
        action: 'read',
        possession: 'own',
    }),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, nest_access_control_1.UserRoles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'profile',
        action: 'read',
        possession: 'own',
    }),
    (0, common_1.Get)('/verify'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'profile',
        action: 'update',
        possession: 'own',
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'profile',
        action: 'delete',
        possession: 'any',
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        resource: 'profile',
        action: 'update',
        possession: 'own',
    }),
    (0, common_1.Patch)('/:id/email'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateEmail", null);
UsersController = __decorate([
    (0, common_1.Controller)('/api/users'),
    (0, serialize_interceptor_1.Serilize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        email_service_1.EmailService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map