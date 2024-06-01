import { Expose, Transform } from 'class-transformer';

export class ResponseProjectDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  demo: string;

  @Expose()
  source: string;

  @Expose()
  date: Date;

  @Expose()
  @Transform(({ obj }) => obj.category.name)
  category: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.proLangs.map(({ language }) => language.name.trim()),
  )
  languages: string[];
}
