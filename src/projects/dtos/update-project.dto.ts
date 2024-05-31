import { IsString } from 'class-validator';

export class UpdateProjectDto {
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
}
