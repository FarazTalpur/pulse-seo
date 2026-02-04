import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getIntegrations(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const integrations = await this.prisma.integration.findMany({
      where: {
        deletedAt: null,
        organizationId: orgId,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      integrations: integrations.map((integration) => ({
        name: integration.name,
        status: integration.status,
        owner: integration.owner ?? '—',
      })),
      destinations: ['Slack alerts', 'Notion brief publishing', 'Jira sprint tasks', 'Email summary'],
    };
  }

  createIntegration(dto: CreateIntegrationDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    return this.prisma.integration.create({
      data: {
        organizationId: orgId,
        type: dto.type,
        name: dto.name,
        status: dto.status ?? 'connected',
        owner: dto.owner,
        config: dto.config,
      },
    });
  }

  async syncIntegration(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureIntegrationInOrg(id, orgId);
    return this.prisma.integration.update({
      where: { id },
      data: {
        status: 'syncing',
        lastSyncedAt: new Date(),
      },
    });
  }

  async disconnectIntegration(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureIntegrationInOrg(id, orgId);
    return this.prisma.integration.update({
      where: { id },
      data: {
        status: 'disconnected',
      },
    });
  }

  private async ensureIntegrationInOrg(id: string, organizationId: string) {
    const integration = await this.prisma.integration.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    return integration;
  }
}
