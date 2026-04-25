import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ProductsController } from "./products.controller";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.PRODUCT_SERVICE_URL || "http://localhost:3002",
        timeout: 5000,
      }),
    }),
  ],
  controllers: [ProductsController],
})
export class ProductsProxyModule {}
