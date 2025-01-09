import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';
import { Prisma } from '@prisma/client';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export class PaginationService {
  constructor(private prisma: PrismaService) {}

  async paginate<T, K extends Prisma.ModelName = Prisma.ModelName>(
    model: K,
    paginationDto: PaginationDto,
    where: any = {},
    include: any = {},
    orderBy: any = { id: 'desc' },
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Type assertion to access the model dynamically
    const prismaModel = this.prisma[model.toLowerCase() as keyof PrismaService];

    const [total, data] = await Promise.all([
      (prismaModel as any).count({ where }),
      (prismaModel as any).findMany({
        skip,
        take: limit,
        where,
        include,
        orderBy,
      }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1,
      },
    };
  }
}
