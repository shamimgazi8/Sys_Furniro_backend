import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosInstance } from "axios";

@Controller("orders")
export class OrdersController {
  constructor(private readonly httpService: HttpService) {}

  private get client(): AxiosInstance {
    return this.httpService.axiosRef;
  }

  @Get()
  async findAll(@Headers("authorization") auth: string) {
    const response = await this.client.get("/api/orders", {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Get(":id")
  async findOne(
    @Param("id") id: number,
    @Headers("authorization") auth: string,
  ) {
    const response = await this.client.get(`/api/orders/${id}`, {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Get("user/:userId")
  async findByUser(
    @Param("userId") userId: number,
    @Headers("authorization") auth: string,
  ) {
    const response = await this.client.get(`/api/orders/user/${userId}`, {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Post()
  async create(@Body() body: any, @Headers("authorization") auth: string) {
    const response = await this.client.post("/api/orders", body, {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() body: any,
    @Headers("authorization") auth: string,
  ) {
    const response = await this.client.patch(`/api/orders/${id}`, body, {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Delete(":id")
  async remove(
    @Param("id") id: number,
    @Headers("authorization") auth: string,
  ) {
    const response = await this.client.delete(`/api/orders/${id}`, {
      headers: { authorization: auth },
    });
    return response.data;
  }
}
