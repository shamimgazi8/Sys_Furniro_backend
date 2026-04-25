import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { CreateProductCommand } from "..";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { data } = command;
    const product = this.productsRepository.create(data);
    return this.productsRepository.save(product as any) as any;
  }
}
