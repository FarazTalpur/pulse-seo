import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getIntegrations() {
    return this.mockDataService.readMockData('integrations');
  }

  createIntegration(dto: CreateIntegrationDto) {
    return this.prisma.integration.create({
      data: {
        organizationId: dto.organizationId,
        type: dto.type,
        name: dto.name,
        status: dto.status ?? 'connected',
        owner: dto.owner,
        config: dto.config,
      },
    });
  }

  async syncIntegration(id: string) {
    return this.prisma.integration.update({
      where: { id },
      data: {
        status: 'syncing',
        lastSyncedAt: new Date(),
      },
    });
  }

  async disconnectIntegration(id: string) {
    return this.prisma.integration.update({
      where: { id },
      data: {
        status: 'disconnected',
      },
    });
  }
}
