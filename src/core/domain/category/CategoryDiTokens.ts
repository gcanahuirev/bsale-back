export class CategoryDITokens {
  public static readonly CategoryRepository: unique symbol =
    Symbol('CategoryRepository');

  public static readonly CategoryService: unique symbol =
    Symbol('CategoryService');
}
