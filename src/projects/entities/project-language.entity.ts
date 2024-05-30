import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './projects.entity';
import { Language } from './languages.entity';

@Entity({ name: 'project_languages' })
export class ProjectLanguage {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'language_id' })
  languageId: string;

  @ManyToOne(() => Project, (project) => project.proLangs)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;

  @ManyToOne(() => Language, (language) => language.proLangs)
  @JoinColumn({ name: 'language_id', referencedColumnName: 'id' })
  language: Language;
}
