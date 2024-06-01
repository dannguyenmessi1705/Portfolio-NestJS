import { User } from 'src/users/users.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'blogs' })
export class Blog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'date' })
  date: Date;

  @BeforeInsert()
  protected setDate(): void {
    this.date = new Date();
  }

  @Column({ name: 'excerpt' })
  excerpt: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'cover_image' })
  coverImage: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'user_created', referencedColumnName: 'id' })
  user: User;
}
