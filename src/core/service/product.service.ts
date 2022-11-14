import { Inject, Injectable } from '@nestjs/common';

import IProduct from '../domain/product/product.interface';
import { ProductDITokens } from '../domain/product/ProductDiTokens';

import { ProductDto } from '../domain/product/Product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductDITokens.ProductRepository)
    private readonly iProduct: IProduct,
  ) {}

  async findManyProducts(
    category?: number,
    search?: string,
  ): Promise<ProductDto[]> {
    return this.iProduct.findManyProducts(category, search);
  }

  async findManyProductsByCategory(id: number): Promise<ProductDto[] | null> {
    return this.iProduct.findManyProductsByCategory(id);
  }

  async findUniqueProduct(id: number): Promise<ProductDto | null> {
    return this.iProduct.findUniqueProduct(id);
  }
}
