import {
  CanActivate, // CanActive là 1 interface, sử dụng để tạo guard cho route
  ExecutionContext, // ExecutionContext là 1 interface, sử dụng để lấy request từ client
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); // context bao gồm các thông tin của request, response, next, chuyển context HTTP request
    const header = request.headers.authorization;
    return header === process.env.SECRET_PASSWORD; // nếu header tồn tại hoặc header === SECRET_PASSWORD thì trả về true, ngược lại trả về false
  }
}
