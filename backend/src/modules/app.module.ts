import { Module } from '@nestjs/common';
import { UserActivityModule } from './user-activity/user-activity.module';
import { FakeEventsModule } from 'src/tasks/fakeEvents.module';

@Module({
  imports: [UserActivityModule, FakeEventsModule],
})
export class AppModule {}
