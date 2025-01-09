import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FakeEventsService } from './fakeEvents.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonModule } from 'src/common/common.module';
import { ActivityGateway } from 'src/modules/user-activity/user-activity.gateway';

@Module({
  imports: [ScheduleModule.forRoot(), CommonModule],
  controllers: [],
  providers: [FakeEventsService, PrismaService, ActivityGateway],
})
export class FakeEventsModule {}
