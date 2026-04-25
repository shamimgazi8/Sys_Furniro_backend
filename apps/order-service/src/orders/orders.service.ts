import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllOrdersQuery, GetOrderByIdQuery, GetOrdersByUserQuery } from "./queries";
import { CreateOrderCommand, UpdateOrderCommand, DeleteOrderCommand } from "./commands";

@Injectable()
export class OrdersService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async findAll() {
    return this.queryBus.execute(new GetAllOrdersQuery());
  }

  async findOne(id: string) {
    return this.queryBus.execute(new GetOrderByIdQuery(id));
  }

  async findByUser(userId: string) {
    return this.queryBus.execute(new GetOrdersByUserQuery(userId));
  }

  async create(data: any) {
    return this.commandBus.execute(new CreateOrderCommand(data));
  }

  async update(id: string, data: any) {
    return this.commandBus.execute(new UpdateOrderCommand(id, data));
  }

  async remove(id: string) {
    return this.commandBus.execute(new DeleteOrderCommand(id));
  }
}
