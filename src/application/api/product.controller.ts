import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ProductService } from 'src/core/service/product.service';

import { ProductDto } from 'src/core/domain/product/Product.dto';

@ApiTags('Ecommerce')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOkResponse({ type: Array<ProductDto> })
  async findManyProducts() {
    const data = await this.productService.findManyProducts();
    return {
      message: 'Products founded',
      data,
    };
  }

  @Get('categories/:id')
  @ApiOkResponse({ type: Array<ProductDto> })
  async findManyProductsByCategory(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findManyProducts();
    return {
      message: `Products founded by category ${id}`,
      data,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  async findUniqueProduct(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findUniqueProduct(id);
    return {
      message: 'Product found',
      data,
    };
  }
}
