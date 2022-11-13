import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configSchema, configurations } from '../config';

import { CategoryModule } from './category.module';
import { PrismaModule } from './prisma.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: configSchema,
      load: [configurations],
    }),
    CategoryModule,
    ProductModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
