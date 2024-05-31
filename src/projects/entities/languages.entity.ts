import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectLanguage } from './project-language.entity';

@Entity({ name: 'languages' })
export class Language {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(
    () => ProjectLanguage,
    (projectLanguage) => projectLanguage.language
  )
  proLangs: ProjectLanguage[];
}
