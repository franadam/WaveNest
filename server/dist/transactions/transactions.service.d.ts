import { PayPalHttpClient } from '@paypal/checkout-server-sdk/lib/core/paypal_http_client';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionsService {
    private transactionRepo;
    client: PayPalHttpClient;
    constructor(transactionRepo: Repository<Transaction>);
    create(user: User, orderID: string): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): string;
}
