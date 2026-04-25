import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthProxyModule } from "./proxy/auth-proxy.module";
import { ProductsProxyModule } from "./proxy/products-proxy.module";
import { OrdersProxyModule } from "./proxy/orders-proxy.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../apps/api-gateway/.env",
    }),
    AuthProxyModule,
    ProductsProxyModule,
    OrdersProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
