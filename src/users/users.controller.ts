import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAdminDetails(@Req() req: any) {
    console.log(req.user);
    console.log(1234);
    return this.userService.getAdminDetails();
  }
}
