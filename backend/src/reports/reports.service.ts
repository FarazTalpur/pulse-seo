import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class ReportsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getReports() {
    return this.mockDataService.readMockData('reports');
  }

  createReport(dto: CreateReportDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    return this.prisma.report.create({
      data: {
        organizationId: orgId,
        name: dto.name,
        cadence: dto.cadence,
        recipients: dto.recipients,
        status: 'scheduled',
      },
    });
  }

  async generateReport(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureReportInOrg(id, orgId);
    return this.prisma.report.update({
      where: { id },
      data: {
        status: 'completed',
        generatedAt: new Date(),
        fileUrl: `reports/${id}.pdf`,
        fileType: 'pdf',
      },
    });
  }

  async deleteReport(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureReportInOrg(id, orgId);
    return this.prisma.report.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async ensureReportInOrg(id: string, organizationId: string) {
    const report = await this.prisma.report.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }
}
