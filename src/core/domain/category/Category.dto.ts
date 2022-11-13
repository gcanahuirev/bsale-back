import { ProductDto } from '../product/Product.dto';

export class CategoryDto {
  id: number;

  name: string | null;

  product?: ProductDto[] | null;
}
