import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "@furniro/common";

export class UpdateUserRoleDto {
  @ApiProperty({
    example: "admin",
    description: "The new role for the user",
    enum: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF, UserRole.CUSTOMER],
    enumName: "UserRole",
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    example: "John Updated",
    description: "Updated name of the user",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: "+1234567890",
    description: "Updated phone number",
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: "123 New Street",
    description: "Updated address",
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
}
