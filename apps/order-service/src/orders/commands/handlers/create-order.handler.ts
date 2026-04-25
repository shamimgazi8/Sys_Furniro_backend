import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { CreateOrderCommand } from "..";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const { data } = command;
    // Calculate total amount from items
    const totalAmount = data.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const order = this.ordersRepository.create({
      ...data,
      totalAmount,
      status: "pending",
    });
    return this.ordersRepository.save(order as any) as any;
  }
}
