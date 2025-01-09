import { Controller, Get, Post } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivity as UserActivityModel } from '@prisma/client';
import { faker } from '@faker-js/faker';
// import { PaginationService } from 'src/common/pagination.service';
// import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('user-activities')
export class UserActivityController {
  constructor(
    private readonly userAactivityService: UserActivityService,
    // private paginationService: PaginationService,
  ) {}

  // @Get('/user-activity')
  // getUserActivity(): Promise<UserActivityModel> {
  //   return this.userAactivityService.userActivity();
  // }

  // async getUsers(@Query() paginationDto: PaginationDto) {
  //   return this.paginationService.paginate(
  //     'UserActivity',
  //     paginationDto,
  //     {},
  //     {},
  //   );
  // }
  @Get()
  getUserActivities(): Promise<UserActivityModel[]> {
    return this.userAactivityService.userActivities();
  }

  @Post()
  createUserActivities(): Promise<UserActivityModel> {
    return this.userAactivityService.createUserActivity({
      userId: faker.database.mongodbObjectId(),
      event: 'SIGNUP',
      metadata: {
        email: faker.internet.email(),
        username: faker.person.fullName(),
        signupSource: faker.helpers.arrayElement(['web', 'mobile', 'referral']),
      },
    });
  }
}
