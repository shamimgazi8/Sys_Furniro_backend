import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { DeleteUserCommand } from "..";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id } = command;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    await this.usersRepository.remove(user);
  }
}
