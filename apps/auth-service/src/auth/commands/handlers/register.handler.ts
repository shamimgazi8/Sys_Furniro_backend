import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersService } from "../../../users/users.service"
import { RegisterCommand } from ".."
import * as bcrypt from "bcryptjs";
import { UserRole } from "@furniro/common";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private usersService: UsersService) {}

  async execute(command: RegisterCommand): Promise<any> {
    const { userDto } = command;
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
}
