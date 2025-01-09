import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FakerService } from 'src/common/faker.service';
import { ActivityGateway } from 'src/modules/user-activity/user-activity.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FakeEventsService {
  constructor(
    private prisma: PrismaService,
    private readonly faker: FakerService,
    private readonly activityGateway: ActivityGateway,
  ) {}
  private readonly logger = new Logger(FakeEventsService.name);

  // Call every 5 seconds
  @Cron('*/5 * * * * *')
  async generateFakeActivity() {
    const event = this.faker.generateRandomEvent();
    const payload = {
      userId: event.userId,
      event: event.event,
      timestamp: new Date(event.timestamp),
      metadata: event.metadata,
    };

    try {
      // const response = await fetch('https://httpbin.org/anything', {
      //   method: 'POST',
      //   body: JSON.stringify(payload),
      // });
      // const data = await response.json();

      // await this.prisma.userActivity.create({
      //   data: JSON.parse(data.data),
      // });

      this.activityGateway.broadcastNewActivity(payload);

      this.logger.debug('Generated event:', payload);
    } catch (error) {
      console.error('Error in data generation:', error.message);
    }
  }
}
