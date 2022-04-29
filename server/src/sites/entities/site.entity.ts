import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  hours: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
