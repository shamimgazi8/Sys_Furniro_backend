import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Headers,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

@Controller("auth")
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  private get client(): AxiosInstance {
    return this.httpService.axiosRef;
  }

  @Post("login")
  async login(@Body() body: any) {
    const response = await this.client.post("/api/auth/login", body);
    return response.data;
  }

  @Post("register")
  async register(@Body() body: any) {
    const response = await this.client.post("/api/auth/register", body);
    return response.data;
  }

  @Get("profile")
  async getProfile(@Headers("authorization") auth: string) {
    const response = await this.client.get("/api/auth/profile", {
      headers: { authorization: auth },
    });
    return response.data;
  }
}
