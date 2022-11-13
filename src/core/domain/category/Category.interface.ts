import { CategoryDto } from './Category.dto';

export default interface ICategoryRepository {
  findManyCategories(): Promise<CategoryDto[]>;
  findUniqueCategory(id: number): Promise<CategoryDto | null>;
}
