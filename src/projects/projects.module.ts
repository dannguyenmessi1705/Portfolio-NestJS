import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectLanguage } from './entities/project-language.entity';
import { Language } from './entities/languages.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectLanguageService } from './services/project-language.service';
import { LanguageService } from './services/language.service';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectLanguage, Language, Category]),
    UsersModule,
  ],
  providers: [
    ProjectsService,
    ProjectLanguageService,
    LanguageService,
    CategoryService,
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
