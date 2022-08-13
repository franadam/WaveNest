import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guitar } from '../../guitars/entities/guitar.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

interface History {
  id: number;
  created_at: string;
  order_id: string;
  amount: number;
  items: Guitar[];
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, default: '' })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  roles: UserRole;

  @Column('jsonb', { default: [] })
  cart: Guitar[];

  @Column('jsonb', { default: [] })
  history: History[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @Column('boolean', { default: false })
  verified: boolean;

  @Column({ default: '' })
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
