import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from 'src/users/users.entity';
import { ProjectLanguage } from './project-language.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'demo' })
  demo: string;

  @Column({ name: 'source' })
  source: string;

  @Column({ name: 'user_created' })
  userCreated: string;

  @Column({ name: 'date' })
  date: Date;

  @BeforeInsert()
  protected setDate(): void {
    this.date = new Date();
  }

  @OneToOne(() => Category, (category) => category, { eager: true })
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user_created', referencedColumnName: 'id' })
  user: User;

  @OneToMany(
    () => ProjectLanguage,
    (projectLanguage) => projectLanguage.project,
    { eager: true, cascade: true },
  )
  proLangs: ProjectLanguage[];
}
