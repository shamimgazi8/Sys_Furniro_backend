import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { GetUserByIdHandler } from "./queries/handlers/get-user-by-id.handler";
import { GetAllUsersHandler } from "./queries/handlers/get-all-users.handler";
import { UpdateUserHandler } from "./commands/handlers/update-user.handler";
import { DeleteUserHandler } from "./commands/handlers/delete-user.handler";

const QueryHandlers = [GetUserByIdHandler, GetAllUsersHandler];
const CommandHandlers = [UpdateUserHandler, DeleteUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [UsersService, ...QueryHandlers, ...CommandHandlers],
  exports: [UsersService],
})
export class UsersModule {}
