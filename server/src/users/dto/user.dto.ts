import { Exclude, Expose } from 'class-transformer';
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
  cart: string[];

  @Expose()
  history: string[];

  @Expose()
  verified: boolean;
}
