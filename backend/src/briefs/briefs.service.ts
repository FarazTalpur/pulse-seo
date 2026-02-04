import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { requireOrganizationId } from '../common/utils/require-organization';
import { formatDateLabel } from '../common/utils/formatting';

@Injectable()
export class BriefsService {
  constructor(private readonly prisma: PrismaService) {}

  async getBriefs(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const briefs = await this.prisma.contentBrief.findMany({
      where: {
        deletedAt: null,
        project: {
          organizationId: orgId,
        },
      },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      briefs: briefs.map((brief) => ({
        title: brief.title,
        type: brief.type ?? 'General',
        status: brief.status,
        owner: brief.owner ?? brief.user?.name ?? 'Unassigned',
        due: formatDateLabel(brief.dueDate),
      })),
      playbooks: [],
    };
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
