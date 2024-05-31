import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { NewProjectDto } from './dtos/create-project.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProject(@Body() body: NewProjectDto, @UploadedFile() file: File) {
    return await this.projectService.createProject(body, file?.path || null);
  }
}
