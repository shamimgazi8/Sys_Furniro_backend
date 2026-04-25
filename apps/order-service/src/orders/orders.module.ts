import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "./entities/order.entity";
import { GetAllOrdersHandler } from "./queries/handlers/get-all-orders.handler";
import { GetOrderByIdHandler } from "./queries/handlers/get-order-by-id.handler";
import { GetOrdersByUserHandler } from "./queries/handlers/get-orders-by-user.handler";
import { CreateOrderHandler } from "./commands/handlers/create-order.handler";
import { UpdateOrderHandler } from "./commands/handlers/update-order.handler";
import { DeleteOrderHandler } from "./commands/handlers/delete-order.handler";

const QueryHandlers = [
  GetAllOrdersHandler,
  GetOrderByIdHandler,
  GetOrdersByUserHandler,
];
const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CqrsModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...QueryHandlers, ...CommandHandlers],
  exports: [OrdersService],
})
export class OrdersModule {}
