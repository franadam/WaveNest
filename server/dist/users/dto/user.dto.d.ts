import { Guitar } from 'src/guitars/entities/guitar.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { UserRole } from '../users.roles';
export declare class UserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: UserRole;
    cart: Guitar[];
    history: string[];
    transactions: Transaction[];
    verified: boolean;
    token: string;
}
