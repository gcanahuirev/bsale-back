import { ProductDto } from './Product.dto';

export default interface IProductRepository {
  findManyProducts(
    category?: number,
    search?: string,
  ): Promise<ProductDto[]> | null;
  findUniqueProduct(id: number): Promise<ProductDto | null>;
  findManyProductsByCategory(id: number): Promise<ProductDto[] | null>;
}
