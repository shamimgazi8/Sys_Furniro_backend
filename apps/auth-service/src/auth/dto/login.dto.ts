import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "john@example.com",
    description: "User's email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
