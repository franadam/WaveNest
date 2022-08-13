import { Guitar } from 'src/guitars/entities/guitar.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateTransactionDto {
  order_id: string;
  email: string;
  orderData: Guitar[];
  user: User;
}
