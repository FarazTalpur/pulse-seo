import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AutomationJobsService {
  constructor(@InjectQueue('automation') private readonly queue: Queue) {}

  enqueueAutomationRun(automationId: string) {
    return this.queue.add('run', { automationId });
  }
}
