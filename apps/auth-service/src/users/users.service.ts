import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { User } from "./entities/user.entity";
import { GetUserByIdQuery, GetAllUsersQuery } from "./queries";
import { UpdateUserCommand, DeleteUserCommand } from "./commands";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  async findOne(id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, data));
  }

  async remove(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
