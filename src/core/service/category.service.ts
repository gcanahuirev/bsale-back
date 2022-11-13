import { Inject, Injectable } from '@nestjs/common';

import ICategory from '../domain/category/Category.interface';
import { CategoryDITokens } from '../domain/category/CategoryDiTokens';

import { CategoryDto } from '../domain/category/Category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CategoryDITokens.CategoryRepository)
    private readonly iCategory: ICategory,
  ) {}

  async findManyCategories(): Promise<CategoryDto[]> {
    return this.iCategory.findManyCategories();
  }

  async findUniqueCategory(id: number): Promise<CategoryDto | null> {
    return this.iCategory.findUniqueCategory(id);
  }
}
