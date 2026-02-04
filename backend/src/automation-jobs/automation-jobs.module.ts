import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomationJobsService } from './automation-jobs.service';
import { AutomationProcessor } from './automation.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'automation',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AutomationJobsService, AutomationProcessor],
  exports: [AutomationJobsService],
})
export class AutomationJobsModule {}
