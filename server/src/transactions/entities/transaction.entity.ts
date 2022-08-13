import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '@paypal/checkout-server-sdk/lib/orders/lib';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column()
  order_id: string;

  @Column('jsonb')
  order_data: Order;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
