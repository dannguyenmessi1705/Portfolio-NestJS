import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { NewProjectDto } from './dtos/create-project.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProject(@Body() body: NewProjectDto, @UploadedFile() file: File) {
    return await this.projectService.createProject(body, file?.path || null);
  }
}
