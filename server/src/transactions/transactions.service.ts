import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SandboxEnvironment } from '@paypal/checkout-server-sdk/lib/core/paypal_environment';
import { PayPalHttpClient } from '@paypal/checkout-server-sdk/lib/core/paypal_http_client';
import { Order } from '@paypal/checkout-server-sdk/lib/orders/lib';
const paypal = require('@paypal/checkout-server-sdk');
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  client: PayPalHttpClient;
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {
    const clientID = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment: SandboxEnvironment = new paypal.core.SandboxEnvironment(
      clientID,
      clientSecret,
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async create(user: User, orderID: string) {
    if (!user) return;
    console.log('transaction service >> orderID', orderID);
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const clientOrder = await this.client.execute(request);
    const order_data: Order = clientOrder.result;
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

  findOne(id: number) {
    return this.transactionRepo.findOneBy({ id });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
