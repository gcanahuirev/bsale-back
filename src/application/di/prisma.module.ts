import { Module } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prismaorm/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
