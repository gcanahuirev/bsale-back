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

  async findManyProducts(id?: number, search?: string): Promise<ProductDto[]> {
    const checkConnection = await this.productRepository.checkConnection();
    if (!checkConnection) {
      await this.productRepository.onModuleInit();
    }
    const where = {};
    if (search) {
      Object.assign(where, { name: { contains: search } });
    }
    if (id) {
      Object.assign(where, { category_categoryToproduct: { id } });
    }
    if (search || id) {
      return this.productRepository.product.findMany({ where });
    }
    return this.productRepository.product.findMany();
  }

  async findUniqueProduct(id: number): Promise<ProductDto | null> {
    const checkConnection = await this.productRepository.checkConnection();
    if (!checkConnection) {
      await this.productRepository.onModuleInit();
    }
    return this.productRepository.product.findUnique({ where: { id } });
  }

  async findManyProductsByCategory(id: number): Promise<ProductDto[] | null> {
    const checkConnection = await this.productRepository.checkConnection();
    if (!checkConnection) {
      await this.productRepository.onModuleInit();
    }
    return this.productRepository.product.findMany({
      where: { category_categoryToproduct: { id } },
    });
  }
}
