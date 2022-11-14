import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductService } from 'src/core/service/product.service';

import { ProductDto } from 'src/core/domain/product/Product.dto';

@ApiTags('Ecommerce')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({ name: 'category', type: Number, required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiOkResponse({ type: Array<ProductDto> })
  async findManyProducts(
    @Query('category') category?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.productService.findManyProducts(category, search);
    return {
      message: 'Products founded',
      data,
    };
  }

  @Get('categories/:id')
  @ApiOkResponse({ type: Array<ProductDto> })
  async findManyProductsByCategory(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findManyProductsByCategory(id);
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
