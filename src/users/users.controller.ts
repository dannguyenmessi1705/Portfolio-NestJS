import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './users.entity';
import { Mail } from './dtos/send-email';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAdminDetails(@Req() req: any) {
    return this.userService.getAdminDetails();
  }

  @Post('send-email')
  sendEmail(@Body() mail: Mail) {
    return this.userService.sendEmail(mail);
  }
}
