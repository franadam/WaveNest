import { Guitar } from '../../guitars/entities/guitar.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
interface History {
    id: number;
    created_at: string;
    order_id: string;
    amount: number;
    items: Guitar[];
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roles: UserRole;
    cart: Guitar[];
    history: History[];
    transactions: Transaction[];
    verified: boolean;
    token: string;
    created_at: Date;
    updated_at: Date;
}
export {};
