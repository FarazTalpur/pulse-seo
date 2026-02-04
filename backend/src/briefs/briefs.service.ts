import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class BriefsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getBriefs() {
    return this.mockDataService.readMockData('briefs');
  }

  async createBrief(dto: CreateBriefDto, organizationId: string | null, userId: string) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureProjectInOrg(dto.projectId, orgId);
    return this.prisma.contentBrief.create({
      data: {
        projectId: dto.projectId,
        userId,
        title: dto.title,
        type: dto.type,
        status: dto.status,
        owner: dto.owner,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async updateBrief(id: string, dto: UpdateBriefDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureBriefInOrg(id, orgId);
    return this.prisma.contentBrief.update({
      where: { id },
      data: {
        title: dto.title,
        type: dto.type,
        status: dto.status,
        owner: dto.owner,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async archiveBrief(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureBriefInOrg(id, orgId);
    return this.prisma.contentBrief.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async ensureProjectInOrg(projectId: string, organizationId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        organizationId,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  private async ensureBriefInOrg(briefId: string, organizationId: string) {
    const brief = await this.prisma.contentBrief.findFirst({
      where: {
        id: briefId,
        deletedAt: null,
        project: {
          organizationId,
        },
      },
    });

    if (!brief) {
      throw new NotFoundException('Brief not found');
    }

    return brief;
  }
}
