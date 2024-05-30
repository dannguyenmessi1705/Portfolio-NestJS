import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getAdminDetails(): Promise<User> {
    return this.userRepo.findOne({
      where: { name: 'Nguyễn Di Đan' },
    });
  }
  
}
