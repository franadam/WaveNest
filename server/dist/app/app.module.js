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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cookieSession = require('cookie-session');
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("../users/entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const brands_module_1 = require("../brands/brands.module");
const brand_entity_1 = require("../brands/entities/brand.entity");
const guitar_entity_1 = require("../guitars/entities/guitar.entity");
const guitars_module_1 = require("../guitars/guitars.module");
const sites_module_1 = require("../sites/sites.module");
const site_entity_1 = require("../sites/entities/site.entity");
const transactions_module_1 = require("../transactions/transactions.module");
const transaction_entity_1 = require("../transactions/entities/transaction.entity");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer
            .apply(cookieSession({
            keys: [this.configService.get('COOKIE_KEY')],
        }))
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DATABASE_HOST'),
                    port: config.get('DATABASE_PORT'),
                    username: config.get('DATABASE_USERNAME'),
                    password: config.get('DATABASE_PASSWORD'),
                    database: config.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, guitar_entity_1.Guitar, brand_entity_1.Brand, site_entity_1.Site, transaction_entity_1.Transaction],
                    synchronize: true,
                }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            brands_module_1.BrandsModule,
            guitars_module_1.GuitarsModule,
            sites_module_1.SitesModule,
            transactions_module_1.TransactionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map