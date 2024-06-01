import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Mail } from './dtos/send-email';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('send-email')
  sendEmail(@Body() mail: Mail) {
    return this.userService.sendEmail(mail);
  }
}
