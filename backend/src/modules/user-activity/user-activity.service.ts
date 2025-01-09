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

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  async createUserActivity(
    data: Prisma.UserActivityCreateInput,
  ): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data,
    });
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }
}
