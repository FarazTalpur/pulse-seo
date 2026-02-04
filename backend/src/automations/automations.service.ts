import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { AutomationJobsService } from '../automation-jobs/automation-jobs.service';

@Injectable()
export class AutomationsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
    private readonly automationJobs: AutomationJobsService,
  ) {}

  getAutomations() {
    return this.mockDataService.readMockData('automations');
  }

  createAutomation(dto: CreateAutomationDto) {
    return this.prisma.automation.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        trigger: dto.trigger,
        triggerType: dto.triggerType,
        status: dto.status,
        owner: dto.owner,
      },
    });
  }

  updateAutomation(id: string, dto: UpdateAutomationDto) {
    return this.prisma.automation.update({
      where: { id },
      data: {
        name: dto.name,
        trigger: dto.trigger,
        triggerType: dto.triggerType,
        status: dto.status,
        owner: dto.owner,
      },
    });
  }

  archiveAutomation(id: string) {
    return this.prisma.automation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  runAutomation(id: string) {
    return this.automationJobs.enqueueAutomationRun(id);
  }
}
