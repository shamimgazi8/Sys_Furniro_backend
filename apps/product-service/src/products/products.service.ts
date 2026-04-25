import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllProductsQuery, GetProductByIdQuery, GetProductsByCategoryQuery } from "./queries";
import { CreateProductCommand, UpdateProductCommand, DeleteProductCommand } from "./commands";

@Injectable()
export class ProductsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async findAll() {
    return this.queryBus.execute(new GetAllProductsQuery());
  }

  async findOne(id: string) {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }

  async findByCategory(category: string) {
    return this.queryBus.execute(new GetProductsByCategoryQuery(category));
  }

  async create(data: any) {
    return this.commandBus.execute(new CreateProductCommand(data));
  }

  async update(id: string, data: any) {
    return this.commandBus.execute(new UpdateProductCommand(id, data));
  }

  async remove(id: string) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
