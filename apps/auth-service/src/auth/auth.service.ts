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

  async login(loginDto: any) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return this.commandBus.execute(new LoginCommand(user));
  }

  async register(userDto: any) {
    return this.commandBus.execute(new RegisterCommand(userDto));
  }
}
