import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryEnum } from '../interfaces/Category.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async findByName(name: string) {
    return await this.categoryRepo.findOne({ where: { name } });
  }

  async createCategory(name: CategoryEnum) {
    const category = this.categoryRepo.create({ name });
    return await this.categoryRepo.save(category);
  }
}
