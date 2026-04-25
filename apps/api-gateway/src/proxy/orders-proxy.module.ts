import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { OrdersController } from "./orders.controller";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.ORDER_SERVICE_URL || "http://localhost:8003",
        timeout: 5000,
      }),
    }),
  ],
  controllers: [OrdersController],
})
export class OrdersProxyModule {}
