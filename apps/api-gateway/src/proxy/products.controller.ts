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

@Controller("products")
export class ProductsController {
  constructor(private readonly httpService: HttpService) {}

  private get client(): AxiosInstance {
    return this.httpService.axiosRef;
  }

  @Get()
  async findAll() {
    const response = await this.client.get("/api/products");
    return response.data;
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const response = await this.client.get(`/api/products/${id}`);
    return response.data;
  }

  @Get("category/:category")
  async findByCategory(@Param("category") category: string) {
    const response = await this.client.get(
      `/api/products/category/${category}`,
    );
    return response.data;
  }

  @Post()
  async create(@Body() body: any, @Headers("authorization") auth: string) {
    const response = await this.client.post("/api/products", body, {
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
    const response = await this.client.patch(`/api/products/${id}`, body, {
      headers: { authorization: auth },
    });
    return response.data;
  }

  @Delete(":id")
  async remove(
    @Param("id") id: number,
    @Headers("authorization") auth: string,
  ) {
    const response = await this.client.delete(`/api/products/${id}`, {
      headers: { authorization: auth },
    });
    return response.data;
  }
}
