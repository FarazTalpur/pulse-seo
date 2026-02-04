import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getIntegrations() {
    return this.mockDataService.readMockData('integrations');
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
