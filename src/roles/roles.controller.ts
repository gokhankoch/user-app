import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/v1/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRole(@Body('name') name: string) {
    return this.roleService.createRole(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
