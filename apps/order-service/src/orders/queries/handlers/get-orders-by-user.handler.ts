import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { GetOrdersByUserQuery } from "..";

@QueryHandler(GetOrdersByUserQuery)
export class GetOrdersByUserHandler implements IQueryHandler<GetOrdersByUserQuery> {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async execute(query: GetOrdersByUserQuery): Promise<Order[]> {
    const { userId } = query;
    return this.ordersRepository.find({ where: { userId } });
  }
}
