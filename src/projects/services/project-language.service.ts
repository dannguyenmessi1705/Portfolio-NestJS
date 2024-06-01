import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectLanguage } from '../entities/project-language.entity';
import { Language } from '../entities/languages.entity';
import { Project } from '../entities/projects.entity';

@Injectable()
export class ProjectLanguageService {
  constructor(
    @InjectRepository(ProjectLanguage)
    private projectLanguageRepo: Repository<ProjectLanguage>,
  ) {}

  async findAll() {
    return await this.projectLanguageRepo.find();
  }

  async findOne(id: string) {
    return await this.projectLanguageRepo.findOneBy({ id });
  }

  async findByProjectId(projectId: string) {
    return await this.projectLanguageRepo.findBy({
      project: { id: projectId },
    });
  }

  async findByLanguageId(languageId: string) {
    return await this.projectLanguageRepo.find({
      where: { language: { id: languageId } },
    });
  }

  async create(projectLanguage: ProjectLanguage) {
    const newProjectLanguage = this.projectLanguageRepo.create(projectLanguage);
    return await this.projectLanguageRepo.save(newProjectLanguage);
  }

  async deleteProLang(project: Project) {
    return await this.projectLanguageRepo
      .createQueryBuilder()
      .delete()
      .from(ProjectLanguage)
      .where('project_id = :id', { id: project.id })
      .execute();
  }
}
