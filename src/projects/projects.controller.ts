import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { NewProjectDto } from './dtos/create-project.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseProjectDto } from './dtos/response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProject(@Body() body: NewProjectDto, @UploadedFile() file: File) {
    return await this.projectService.createProject(body, file?.path || null);
  }

  @Get()
  @Serialize(ResponseProjectDto)
  async findAllProjects() {
    return await this.projectService.findAllProject();
  }
}
