import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrderStatus } from "../interfaces/order.interface";

export class OrderItemDto {
  @ApiProperty({ example: "uuid-product-id" })
  @IsString()
  productId: string;

  @ApiProperty({ example: "Modern Sofa" })
  @IsString()
  productName: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 599.99 })
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: "uuid-user-id" })
  @IsString()
  userId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ example: "123 Main St, City, Country" })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ example: "credit_card" })
  @IsString()
  paymentMethod: string;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ example: "123 Main St, City, Country" })
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @ApiPropertyOptional({ example: "credit_card" })
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
