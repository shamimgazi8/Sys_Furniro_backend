import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UsersModule } from "../users/users.module";
import { LoginHandler } from "./commands/handlers/login.handler";
import { RegisterHandler } from "./commands/handlers/register.handler";
import { ValidateUserHandler } from "./queries/handlers/validate-user.handler";

const CommandHandlers = [LoginHandler, RegisterHandler];
const QueryHandlers = [ValidateUserHandler];

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "furniro-secret-key",
      signOptions: { expiresIn: "7d" },
    }),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [AuthService],
})
export class AuthModule {}
