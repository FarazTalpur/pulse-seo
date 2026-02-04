import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('automation')
export class AutomationProcessor extends WorkerHost {
  async process(job: Job) {
    if (job.name === 'run') {
      const { automationId } = job.data as { automationId: string };
      // Placeholder: later replace with real workflow execution
      return { status: 'completed', automationId };
    }
    return { status: 'ignored' };
  }
}
