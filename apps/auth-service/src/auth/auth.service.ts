import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginCommand, RegisterCommand } from "./commands";
import { ValidateUserQuery } from "./queries";

@Injectable()
export class AuthService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return this.queryBus.execute(new ValidateUserQuery(email, pass));
  }

  async login(user: any) {
    return this.commandBus.execute(new LoginCommand(user));
  }

  async register(userDto: any) {
    return this.commandBus.execute(new RegisterCommand(userDto));
  }
}
