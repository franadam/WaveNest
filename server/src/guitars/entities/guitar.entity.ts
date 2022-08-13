import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { Picture } from 'src/interfaces/Pictures.interface';

@Entity()
export class Guitar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 250 })
  model: string;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column()
  frets: number;

  @Column()
  wood: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  available: number;

  @Column({ default: 0 })
  itemSold: number;

  @Column({ default: false })
  shipping: boolean;

  @Column('jsonb', { default: [{ id: '', url: '' }] })
  images: Picture[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
