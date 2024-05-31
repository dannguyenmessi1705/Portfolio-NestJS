import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Mail } from './dtos/send-email';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private sendgrid: SendgridService,
  ) {}

  async getAdminDetails(): Promise<User> {
    return this.userRepo.findOne({
      where: { id: process.env.USER_ID },
    });
  }

  async sendEmail(body: Mail) {
    await this.sendgrid.sendEmailWithTemplate(process.env.SENDGRID_EMAIL, body);
  }
}
