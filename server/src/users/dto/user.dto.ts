import { Exclude, Expose } from 'class-transformer';
import { Guitar } from 'src/guitars/entities/guitar.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { UserRole } from '../users.roles';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  roles: UserRole;

  @Expose()
  cart: Guitar[];

  @Expose()
  history: string[];

  @Expose()
  transactions: Transaction[];

  @Expose()
  verified: boolean;

  @Expose()
  token: string;
}
