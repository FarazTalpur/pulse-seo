import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { AutomationJobsService } from '../automation-jobs/automation-jobs.service';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class AutomationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automationJobs: AutomationJobsService,
  ) {}

  async getAutomations(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const automations = await this.prisma.automation.findMany({
      where: {
        deletedAt: null,
        organizationId: orgId,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      automations: automations.map((automation) => ({
        name: automation.name,
        trigger: automation.trigger,
        status: automation.status,
        owner: automation.owner ?? 'Unassigned',
      })),
      recipes: [
        'Refresh pages with >15% traffic decay',
        'Generate internal link clusters for top 50 pages',
        'Re-score Core Web Vitals weekly',
        'Send alert when keyword slips 3+ positions',
      ],
    };
  }

  createAutomation(dto: CreateAutomationDto, organizationId: string | null, userId: string) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    return this.prisma.automation.create({
      data: {
        organizationId: orgId,
        userId,
        name: dto.name,
        trigger: dto.trigger,
        triggerType: dto.triggerType,
        status: dto.status,
        owner: dto.owner,
      },
    });
  }

  async updateAutomation(id: string, dto: UpdateAutomationDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureAutomationInOrg(id, orgId);
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

  async archiveAutomation(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureAutomationInOrg(id, orgId);
    return this.prisma.automation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async runAutomation(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureAutomationInOrg(id, orgId);
    return this.automationJobs.enqueueAutomationRun(id);
  }

  private async ensureAutomationInOrg(id: string, organizationId: string) {
    const automation = await this.prisma.automation.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return automation;
  }
}
