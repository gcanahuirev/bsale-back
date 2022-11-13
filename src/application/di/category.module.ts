import { Module, Provider } from '@nestjs/common';
import { CategoryDITokens } from 'src/core/domain/category/CategoryDiTokens';

import CategoryRepositoryAdapter from '../../infrastructure/prismaorm/category/category.repository';

import { PrismaModule } from './prisma.module';

import { CategoryController } from '../api/category.controller';

import { CategoryService } from '../../core/service/category.service';

const dataPersistenceProviders: Provider[] = [
  {
    useClass: CategoryRepositoryAdapter,
    provide: CategoryDITokens.CategoryRepository,
  },
];
const useCaseProviders: Provider[] = [
  {
    useClass: CategoryService,
    provide: CategoryDITokens.CategoryService,
  },
];

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    ...dataPersistenceProviders,
    ...useCaseProviders,
  ],
  exports: [],
})
export class CategoryModule {}
