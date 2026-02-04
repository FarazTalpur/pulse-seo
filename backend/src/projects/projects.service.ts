import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  listByOrganization(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    return this.prisma.project.findMany({
      where: {
        organizationId: orgId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createProject(dto: CreateProjectDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    return this.prisma.project.create({
      data: {
        organizationId: orgId,
        name: dto.name,
        domain: dto.domain,
        baseUrl: dto.baseUrl,
      },
    });
  }

  async updateProject(id: string, dto: UpdateProjectDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureProjectInOrg(id, orgId);
    return this.prisma.project.update({
      where: { id },
      data: {
        name: dto.name,
        domain: dto.domain,
        baseUrl: dto.baseUrl,
      },
    });
  }

  async deleteProject(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureProjectInOrg(id, orgId);
    return this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async ensureProjectInOrg(id: string, organizationId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
