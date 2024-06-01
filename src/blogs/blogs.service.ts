import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateBlogDto } from './dtos/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
    private userService: UsersService,
  ) {}

  async findAllBlogs() {
    return await this.blogRepo.find({ order: { date: 'DESC' } });
  }

  async findOneById(id: string) {
    return await this.blogRepo.findOneBy({ id });
  }

  async createBlog(body: CreateBlogDto, filePath: string = null) {
    const admin = await this.userService.getAdminDetails();
    if (!admin) {
      throw new UnauthorizedException();
    }
    const blog = new Blog();
    const newBlog = Object.assign(blog, body);
    newBlog.user = admin;
    if (filePath) {
      newBlog.coverImage = filePath;
    }
    const saveBlog = this.blogRepo.create(newBlog);
    await this.blogRepo.save(saveBlog);
    return {
      message: 'Blog created successfully',
    };
  }

  async updateBlog(id: string, body: UpdateBlogDto, filePath: string = null) {
    const admin = await this.userService.getAdminDetails();
    if (!admin) {
      throw new UnauthorizedException();
    }
    const blog = await this.findOneById(id);
    if (!blog) {
      throw new UnauthorizedException();
    }
    const updateBlog = Object.assign(blog, body);
    if (filePath) {
      updateBlog.coverImage = filePath;
    }
    await this.blogRepo.save(updateBlog);
    return {
      message: 'Blog updated successfully',
    };
  }
}
