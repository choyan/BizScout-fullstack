import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Prisma,
  UserActivity,
  UserActivity as UserActivityModel,
} from '@prisma/client';

@Injectable()
export class UserActivityService {
  constructor(private prisma: PrismaService) {}

  async userActivity(
    userWhereUniqueInput: Prisma.UserActivityWhereUniqueInput,
  ): Promise<UserActivityModel | null> {
    return this.prisma.userActivity.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async userActivities(): Promise<UserActivityModel[] | null> {
    return this.prisma.userActivity.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async createUserActivity(
    data: Prisma.UserActivityCreateInput,
  ): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data,
    });
  }
}
