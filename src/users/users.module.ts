import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { Category } from 'src/projects/entities/category.entity';
import { ProjectLanguage } from 'src/projects/entities/project-language.entity';
import { Language } from 'src/projects/entities/languages.entity';
import { Blog } from 'src/blogs/blogs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Project,
      Category,
      ProjectLanguage,
      Language,
      Blog,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
