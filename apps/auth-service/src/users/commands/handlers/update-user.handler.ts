import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { UpdateUserCommand } from "..";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, data } = command;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }
}
