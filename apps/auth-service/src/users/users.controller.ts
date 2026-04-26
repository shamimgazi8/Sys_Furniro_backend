import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserRole, Roles, RolesGuard } from "@furniro/common";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user (Admin only)" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserRoleDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
