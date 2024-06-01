import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { CreateBlogDto } from './dtos/create-blog.dtos';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createBlogDto(@Body() body: CreateBlogDto, @UploadedFile() file: File) {
    const filePath = file ? file.path : null;
    return await this.blogService.createBlog(body, filePath);
  }

  @Get()
  async getAllBlogs() {
    return await this.blogService.findAllBlogs();
  }
}
