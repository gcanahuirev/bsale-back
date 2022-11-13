import { Inject, Injectable } from '@nestjs/common';
import IProductRepository from 'src/core/domain/product/Product.interface';

import { PrismaService } from '../prisma.service';

import { ProductDto } from '../../../core/domain/product/Product.dto';

@Injectable()
export default class ProductRepositoryAdapter implements IProductRepository {
  constructor(
    @Inject(PrismaService)
    private readonly productRepository: PrismaService,
  ) {}

  async findManyProducts(): Promise<ProductDto[]> {
    return this.productRepository.product.findMany();
  }

  async findUniqueProduct(id: number): Promise<ProductDto | null> {
    return this.productRepository.product.findUnique({ where: { id } });
  }

  async findManyProductsByCategory(id: number): Promise<ProductDto[] | null> {
    return this.productRepository.product.findMany({
      where: { category_categoryToproduct: { id } },
    });
  }
}
