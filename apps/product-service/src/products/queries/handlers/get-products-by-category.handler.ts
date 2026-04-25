import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { GetProductsByCategoryQuery } from "..";

@QueryHandler(GetProductsByCategoryQuery)
export class GetProductsByCategoryHandler implements IQueryHandler<GetProductsByCategoryQuery> {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async execute(query: GetProductsByCategoryQuery): Promise<Product[]> {
    const { category } = query;
    return this.productsRepository.find({
      where: { category, isActive: true },
    });
  }
}
