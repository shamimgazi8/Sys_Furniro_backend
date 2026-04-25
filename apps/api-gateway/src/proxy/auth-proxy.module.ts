import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
        timeout: 5000,
      }),
    }),
  ],
  controllers: [AuthController],
})
export class AuthProxyModule {}
