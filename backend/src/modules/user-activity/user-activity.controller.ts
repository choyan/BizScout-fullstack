import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import {
  Event,
  Prisma,
  UserActivity as UserActivityModel,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PaginationService } from '../../common/pagination.service';
import { UserActivityFilterDto } from './dto/user-activity-filter.dto';

@Controller('user-activities')
export class UserActivityController {
  constructor(
    private readonly userAactivityService: UserActivityService,
    private paginationService: PaginationService,
  ) {}

  @Get()
  async getUsers(@Query() filterDto: UserActivityFilterDto) {
    const where = this.buildWhereClause(filterDto);

    return this.paginationService.paginate<UserActivityModel>(
      'UserActivity',
      filterDto,
      where,
    );
  }

  @Post()
  createUserActivities(): Promise<UserActivityModel> {
    return this.userAactivityService.createUserActivity({
      userId: faker.database.mongodbObjectId(),
      event: 'SIGNUP' as Event,
      metadata: {
        email: faker.internet.email(),
        username: faker.person.fullName(),
        signupSource: faker.helpers.arrayElement(['web', 'mobile', 'referral']),
      } as Prisma.JsonValue,
    });
  }

  private buildWhereClause(filterDto: UserActivityFilterDto) {
    const where: any = {};

    if (filterDto.event) {
      where.event = {
        equals: filterDto.event,
      };
    }

    return where;
  }
}
