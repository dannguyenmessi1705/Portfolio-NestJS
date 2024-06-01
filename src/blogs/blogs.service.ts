import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { pageSize } from 'src/utils/pageSize';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
    private userService: UsersService,
  ) {}

  async findAllBlogs(page: number = 0) {
    return await this.blogRepo.find({
      order: { date: 'DESC' },
      take: pageSize,
      skip: page * pageSize,
    });
  }

  async findOneById(id: string) {
    return await this.blogRepo.findOneBy({ id });
  }

  async findBlogByTitle(title: string, page: number = 0) {
    const blogs = await this.blogRepo
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.user', 'user')
      .where('blogs.title LIKE :title', { title: `%${title}%` })
      .take(pageSize)
      .skip(page * pageSize)
      .getMany();
    return blogs;
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

  async deleteBlog(id: string) {
    const admin = await this.userService.getAdminDetails();
    if (!admin) {
      throw new UnauthorizedException();
    }
    const blog = await this.findOneById(id);
    if (!blog) {
      throw new UnauthorizedException();
    }
    await this.blogRepo.delete(id);
    return {
      message: 'Blog deleted successfully',
    };
  }
}
