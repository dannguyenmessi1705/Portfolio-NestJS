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
import { ProjectsService } from './services/projects.service';
import { NewProjectDto } from './dtos/create-project.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseProjectDto } from './dtos/response.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

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

  @Get(':projectId')
  @Serialize(ResponseProjectDto)
  async findOneProject(@Param('projectId') projectId: string) {
    return await this.projectService.findOneById(projectId);
  }

  @UseGuards(AuthGuard)
  @Patch(':projectId')
  @UseInterceptors(FileInterceptor('image'))
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
    @UploadedFile() file: File,
  ) {
    if (!body) {
      throw new BadRequestException('Body is required');
    }
    return await this.projectService.update(
      projectId,
      body,
      file?.path || null,
    );
  }
}
