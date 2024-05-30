import { Blog } from 'src/blogs/blogs.entity';
import { Project } from 'src/projects/entities/projects.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'image' })
  image: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
