import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  uuid: string;

  @Column()
  userId: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: "pending" })
  status: string;

  @Column("simple-json", { nullable: true })
  items: any[];

  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
