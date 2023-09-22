import { Order } from '@paypal/checkout-server-sdk/lib/orders/lib';
import { User } from '../../users/entities/user.entity';
export declare class Transaction {
    id: number;
    email: string;
    order_id: string;
    order_data: Order;
    user: User;
}
