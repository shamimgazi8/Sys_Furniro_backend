import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { UsersService } from "../../../users/users.service"
import { ValidateUserQuery } from ".."
import * as bcrypt from "bcrypt";

@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler implements IQueryHandler<ValidateUserQuery> {
  constructor(private usersService: UsersService) {}

  async execute(query: ValidateUserQuery): Promise<any> {
    const { email, password } = query;
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
