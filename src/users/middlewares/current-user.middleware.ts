import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

// Để có thể sủe dụng req.user mà không báo lỗi (Không phải dùng //@ts-ignore)
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const user = req.headers.user; // Lấy user_id từ session trong request
    if (!user) {
      const user = await this.userService.getAdminDetails(); // Lấy user từ user_id
      // @ts-ignore
      req.headers.user = user;
    }
    next(); // Chuyển tiếp request sang middleware tiếp theo
  }
}
