import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getReports() {
    return this.mockDataService.readMockData('reports');
  }

  createReport(dto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        cadence: dto.cadence,
        recipients: dto.recipients,
        status: 'scheduled',
      },
    });
  }

  async generateReport(id: string) {
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

  async deleteReport(id: string) {
    return this.prisma.report.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
