import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barcode: string;

  @Column({ type: 'enum', enum: ['pending', 'delivered'], default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  defaultProfit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  customProfit: number;

  @Column({ nullable: true })
  deliveryTime: Date;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}