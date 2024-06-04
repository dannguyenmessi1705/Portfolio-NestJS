import { IsArray, IsEnum, IsString } from 'class-validator';
import { CategoryEnum } from '../interfaces/Category.enum';

export class NewProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  demo: string;

  @IsString()
  source: string;

  @IsString()
  languages: string;

  @IsEnum(CategoryEnum)
  category: CategoryEnum;
}
