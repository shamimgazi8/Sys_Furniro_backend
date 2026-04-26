import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Get all products" })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  findOne(@Param("id") id: number) {
    return this.productsService.findOne(id);
  }

  @Get("category/:category")
  @ApiOperation({ summary: "Get products by category" })
  findByCategory(@Param("category") category: string) {
    return this.productsService.findByCategory(category);
  }

  @Post()
  @ApiOperation({ summary: "Create product" })
  create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update product" })
  update(@Param("id") id: number, @Body() updateProductDto: any) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product" })
  remove(@Param("id") id: number) {
    return this.productsService.remove(id);
  }
}
