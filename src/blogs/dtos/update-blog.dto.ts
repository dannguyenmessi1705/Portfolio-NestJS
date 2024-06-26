import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  excerpt: string;

  @IsOptional()
  @IsString()
  content: string;
}
