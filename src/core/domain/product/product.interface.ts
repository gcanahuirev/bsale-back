import { ProductDto } from './Product.dto';

export default interface IProductRepository {
  findManyProducts(): Promise<ProductDto[]>;
  findUniqueProduct(id: number): Promise<ProductDto | null>;
  findManyProductsByCategory(id: number): Promise<ProductDto[] | null>;
}
