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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paypal = require('@paypal/checkout-server-sdk');
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
        const clientID = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        const environment = new paypal.core.SandboxEnvironment(clientID, clientSecret);
        this.client = new paypal.core.PayPalHttpClient(environment);
    }
    async create(user, orderID) {
        if (!user)
            return;
        console.log('transaction service >> orderID', orderID);
        const request = new paypal.orders.OrdersGetRequest(orderID);
        const clientOrder = await this.client.execute(request);
        const order_data = clientOrder.result;
        console.log('transaction service >> order', order_data);
        const transaction = await this.transactionRepo.create({
            user: user,
            email: user.email,
            order_id: orderID,
            order_data,
        });
        return this.transactionRepo.save(transaction);
    }
    findAll() {
        return this.transactionRepo.find();
    }
    findOne(id) {
        return this.transactionRepo.findOneBy({ id });
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map