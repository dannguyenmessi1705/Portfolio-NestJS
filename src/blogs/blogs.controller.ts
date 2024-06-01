import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BlogResponseDto } from './dtos/response.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';

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
  @Serialize(BlogResponseDto)
  async getAllBlogs() {
    return await this.blogService.findAllBlogs();
  }

  @Get(':blogId')
  @Serialize(BlogResponseDto)
  async getBlogById(@Param('blogId') blogId: string) {
    return await this.blogService.findOneById(blogId);
  }

  @UseGuards(AuthGuard)
  @Patch(':blogId')
  @UseInterceptors(FileInterceptor('image'))
  async updateBlog(
    @Param('blogId') blogId: string,
    @Body() body: UpdateBlogDto,
    @UploadedFile() file: File,
  ) {
    if (!body) {
      throw new BadRequestException('Please provide the required fields');
    }
    const filePath = file ? file.path : null;
    return await this.blogService.updateBlog(blogId, body, filePath);
  }
}
