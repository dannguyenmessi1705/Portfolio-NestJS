import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Mail } from './dtos/send-email';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private sendgrid: SendgridService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectQueue('send-email') private sendEmailQueue: Queue,
  ) {}

  async getAdminDetails(): Promise<User> {
    const admin = (await this.cache.get('admin')) as User;
    if (admin) return admin;
    const adminDb = await this.userRepo.findOne({
      where: { id: process.env.USER_ID },
    });
    if (adminDb) {
      //@ts-ignore
      await this.cache.set('admin', adminDb, { ttl: 30 });
      return adminDb;
    }
    return null;
  }

  async sendEmail(body: Mail) {
    await this.sendEmailQueue.add('contact', body);
  }
}
