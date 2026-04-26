import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ["user"] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: id as any },
      relations: ["user"],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ["user"],
    });
  }

  async create(data: Partial<Order>): Promise<Order> {
    const order = this.ordersRepository.create(data);
    return this.ordersRepository.save(order);
  }

  async update(id: number, data: Partial<Order>): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, data);
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }
}
