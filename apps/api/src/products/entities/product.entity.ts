import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  stock: number;

  @Column({ nullable: true })
  category: string;

  @Column("simple-array", { nullable: true })
  images: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
