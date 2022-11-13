export class ProductDITokens {
  public static readonly ProductRepository: unique symbol =
    Symbol('ProductRepository');

  public static readonly ProductService: unique symbol =
    Symbol('ProductService');
}
