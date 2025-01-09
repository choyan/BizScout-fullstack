import { Module } from '@nestjs/common';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UserActivityController],
  providers: [UserActivityService, PrismaService],
})
export class UserActivityModule {}
