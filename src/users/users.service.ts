import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
export type User1 = any;
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
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User1 | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
