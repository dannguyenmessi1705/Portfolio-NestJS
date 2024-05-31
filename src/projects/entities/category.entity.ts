import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEnum } from '../interfaces/Category.enum';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', enum: CategoryEnum, default: CategoryEnum.OTHER })
  name: string;
}
