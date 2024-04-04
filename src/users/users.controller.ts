import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdate } from './dtos/userUpdate.input.dto';

@Controller('/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req) {
    return this.usersService.getMe(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  updateMe(@Request() req, @Body() userUpdate: UserUpdate) {
    return this.usersService.updateMe(req.user.userId, userUpdate);
  }
}
