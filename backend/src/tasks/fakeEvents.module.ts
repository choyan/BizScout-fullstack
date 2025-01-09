import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FakeEventsService } from './fakeEvents.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ScheduleModule.forRoot(), CommonModule],
  controllers: [],
  providers: [FakeEventsService, PrismaService],
})
export class FakeEventsModule {}
