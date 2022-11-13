import { Module, Provider } from '@nestjs/common';
import { ProductDITokens } from 'src/core/domain/product/ProductDiTokens';
import ProductRepositoryAdapter from 'src/infrastructure/prismaorm/product/product.repository';

import { PrismaModule } from './prisma.module';

import { ProductController } from '../api/product.controller';

import { ProductService } from '../../core/service/product.service';

const dataPersistenceProviders: Provider[] = [
  {
    useClass: ProductRepositoryAdapter,
    provide: ProductDITokens.ProductRepository,
  },
];
const useCaseProviders: Provider[] = [
  {
    useClass: ProductService,
    provide: ProductDITokens.ProductService,
  },
];

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ...dataPersistenceProviders, ...useCaseProviders],
  exports: [],
})
export class ProductModule {}
