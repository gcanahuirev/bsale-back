import { Inject, Injectable } from '@nestjs/common';
import ICategoryRepository from 'src/core/domain/category/Category.interface';

import { PrismaService } from '../prisma.service';

import { CategoryDto } from '../../../core/domain/category/Category.dto';

@Injectable()
export default class CategoryRepositoryAdapter implements ICategoryRepository {
  constructor(
    @Inject(PrismaService)
    private readonly categoryRepository: PrismaService,
  ) {}

  async findManyCategories(): Promise<CategoryDto[]> {
    const checkConnection = await this.categoryRepository.checkConnection();
    if (!checkConnection) {
      await this.categoryRepository.onModuleInit();
    }
    return this.categoryRepository.category.findMany();
  }

  async findUniqueCategory(id: number): Promise<CategoryDto | null> {
    const checkConnection = await this.categoryRepository.checkConnection();
    if (!checkConnection) {
      await this.categoryRepository.onModuleInit();
    }
    return this.categoryRepository.category.findUnique({
      where: { id },
      include: { product: true },
    });
  }
}
