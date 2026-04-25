import { IsString, IsNumber, IsOptional, IsArray, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: "Modern Sofa" })
  @IsString()
  name: string;

  @ApiProperty({ example: "A comfortable modern sofa" })
  @IsString()
  description: string;

  @ApiProperty({ example: 599.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: "furniture" })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: ["https://example.com/sofa.jpg"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: "Modern Sofa" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "A comfortable modern sofa" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 599.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: "furniture" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: ["https://example.com/sofa.jpg"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isActive?: boolean;
}
