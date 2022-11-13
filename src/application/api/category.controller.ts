import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CategoryService } from 'src/core/service/category.service';

import { CategoryDto } from 'src/core/domain/category/Category.dto';

@ApiTags('Ecommerce')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ type: Array<CategoryDto> })
  async findManyCategories() {
    const data = await this.categoryService.findManyCategories();
    return {
      message: 'Categories founded',
      data,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryDto })
  async findUniqueCategory(@Param('id', ParseIntPipe) id: number) {
    const data = await this.categoryService.findUniqueCategory(id);
    return {
      message: 'Category found',
      data,
    };
  }

  @Get(':id/products')
  @ApiOkResponse({ type: CategoryDto })
  async findUniqueCategoryWithProducts(@Param('id', ParseIntPipe) id: number) {
    const data = await this.categoryService.findUniqueCategory(id);
    return {
      message: 'Category found',
      data,
    };
  }
}
