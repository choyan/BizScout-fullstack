import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export class PaginationService {
  constructor(private prisma: PrismaService) {}

  async paginate<T>(
    modelName: string,
    paginationDto: PaginationDto,
    where = {},
    include = {},
    orderBy = { id: 'desc' },
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Get the correct model name (first character lowercase)
    const model = modelName.charAt(0).toLowerCase() + modelName.slice(1);

    // Verify the model exists
    if (!(model in this.prisma)) {
      throw new Error(`Model ${modelName} not found in Prisma client`);
    }

    const [total, data] = await Promise.all([
      this.prisma[model].count({ where }),
      this.prisma[model].findMany({
        skip,
        take: Number(limit),
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
