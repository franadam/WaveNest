import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto, req: Request): Promise<import("./entities/transaction.entity").Transaction>;
    findAll(): Promise<import("./entities/transaction.entity").Transaction[]>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: string): string;
}
