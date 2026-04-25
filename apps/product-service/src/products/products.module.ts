import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "./entities/product.entity";
import { GetAllProductsHandler } from "./queries/handlers/get-all-products.handler";
import { GetProductByIdHandler } from "./queries/handlers/get-product-by-id.handler";
import { GetProductsByCategoryHandler } from "./queries/handlers/get-products-by-category.handler";
import { CreateProductHandler } from "./commands/handlers/create-product.handler";
import { UpdateProductHandler } from "./commands/handlers/update-product.handler";
import { DeleteProductHandler } from "./commands/handlers/delete-product.handler";

const QueryHandlers = [
  GetAllProductsHandler,
  GetProductByIdHandler,
  GetProductsByCategoryHandler,
];
const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...QueryHandlers, ...CommandHandlers],
  exports: [ProductsService],
})
export class ProductsModule {}
