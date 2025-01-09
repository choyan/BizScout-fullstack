import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';
import { PaginationService } from './pagination.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FakerService, PaginationService, PrismaService],
  exports: [FakerService, PaginationService],
})
export class CommonModule {}
