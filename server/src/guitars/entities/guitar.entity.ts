import { Brand } from 'src/brands/entities/brand.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Guitar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
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

  @Column('varchar', { array: true, default: [] })
  images: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
