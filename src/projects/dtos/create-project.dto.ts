import { IsEnum, IsString } from 'class-validator';
import { CategoryEnum } from '../interfaces/Category.enum';

export class NewProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  demo: string;

  @IsString()
  source: string;

  languages: string[];

  @IsEnum(CategoryEnum)
  category: string;
}
