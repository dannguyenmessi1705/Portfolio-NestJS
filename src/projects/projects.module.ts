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
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { diskStorage } from 'fastify-multer';

@Module({
  imports: [
    FastifyMulterModule.register({
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: 'public/images/projects',
        filename: (req: any, file, cb) => {
          // @ts-ignore
          cb(
            null,
            req.body.title.replace(/\s/g, '') +
              '-' +
              Date.now() +
              '.' +
              file.originalname.split('.')[1],
          );
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 20,
      },
    }),
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
