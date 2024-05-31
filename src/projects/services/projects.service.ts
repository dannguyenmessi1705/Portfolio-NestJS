import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/projects.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { NewProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ProjectLanguage } from '../entities/project-language.entity';
import { LanguageService } from './language.service';
import { ProjectLanguageService } from './project-language.service';
import { CategoryService } from './category.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    private userService: UsersService,
    private languageService: LanguageService,
    private projectLanguageService: ProjectLanguageService,
    private categoryService: CategoryService,
  ) {}

  async findAllProject() {
    return await this.projectRepo.find();
  }

  async findOneById(id: string) {
    return await this.projectRepo.findOneBy({ id });
  }

  async createProject(project: NewProjectDto) {
    const admin = await this.userService.getAdminDetails();
    if (!admin) {
      throw new UnauthorizedException();
    }
    const { languages, category, ...pro } = project;

    const newProject = new Project();
    Object.assign(newProject, pro);

    newProject.user = admin;
    const saveProject = this.projectRepo.create(newProject);

    languages.forEach(async (lang) => {
      let language = await this.languageService.findByNameLang(lang);
      if (!language) {
        language.name = lang;
        language = await this.languageService.createLang(language);
      }
      const proLang = new ProjectLanguage();
      proLang.language = language;
      proLang.project = saveProject;
      const newProLang = await this.projectLanguageService.create(proLang);
      saveProject.proLangs.push(newProLang);
    });

    const categoryPro = await this.categoryService.findByName(category);
    saveProject.category = categoryPro;
    return await this.projectRepo.save(saveProject);
  }

  async update(id: string, body: UpdateProjectDto, filePath: string = null) {
    const admin = await this.userService.getAdminDetails();
    if (!admin) {
      throw new UnauthorizedException();
    }
    const project = await this.findOneById(id);
    if (!project) {
      return null;
    }
    const updateProject: Partial<Project> = { ...body };
    if (filePath) {
      updateProject.image = filePath;
    }
    Object.assign(project, updateProject);
    return await this.projectRepo.save(project);
  }
}
