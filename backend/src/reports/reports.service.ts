import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { requireOrganizationId } from '../common/utils/require-organization';
import { formatRelativeTime } from '../common/utils/formatting';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getReports(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const [reports, templates] = await Promise.all([
      this.prisma.report.findMany({
        where: {
          deletedAt: null,
          organizationId: orgId,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.reportTemplate.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const exports = reports
      .filter((report) => report.fileUrl)
      .map((report) => ({
        name: report.name,
        type: report.fileType ?? 'file',
        time: report.generatedAt ? formatRelativeTime(report.generatedAt) : 'Recently',
      }));

    return {
      reports: reports.map((report) => ({
        name: report.name,
        cadence: report.cadence ?? 'Ad hoc',
        recipients: report.recipients ?? '—',
        status: report.status,
      })),
      exports,
      templates: templates.map((template) => template.name),
    };
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
        fileUrl: `/v1/reports/${id}/download`,
        fileType: 'csv',
      },
    });
  }

  async buildReportCsv(id: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const report = await this.ensureReportInOrg(id, orgId);
    const [auditRuns, briefs, automations, integrations] = await Promise.all([
      this.prisma.auditRun.findMany({
        where: {
          project: { organizationId: orgId },
          deletedAt: null,
        },
        include: { project: true },
        orderBy: { createdAt: 'desc' },
        take: 25,
      }),
      this.prisma.contentBrief.findMany({
        where: {
          project: { organizationId: orgId },
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        take: 25,
      }),
      this.prisma.automation.findMany({
        where: { organizationId: orgId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 25,
      }),
      this.prisma.integration.findMany({
        where: { organizationId: orgId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 25,
      }),
    ]);

    const rows: Array<Array<string | number | null | undefined>> = [
      ['Report Name', report.name],
      ['Status', report.status],
      ['Generated At', new Date().toISOString()],
      [],
      ['Audit Runs'],
      ['Project', 'Status', 'Issues', 'Score', 'Started At'],
      ...auditRuns.map((run) => [
        run.project.domain || run.project.baseUrl || run.site || 'Unknown',
        run.status,
        run.issuesCount ?? 0,
        run.score ?? 0,
        run.startedAt?.toISOString() ?? run.createdAt.toISOString(),
      ]),
      [],
      ['Content Briefs'],
      ['Title', 'Status', 'Owner', 'Due Date'],
      ...briefs.map((brief) => [
        brief.title,
        brief.status,
        brief.owner ?? 'Unassigned',
        brief.dueDate?.toISOString() ?? '',
      ]),
      [],
      ['Automations'],
      ['Name', 'Trigger', 'Status', 'Owner'],
      ...automations.map((automation) => [
        automation.name,
        automation.trigger,
        automation.status,
        automation.owner ?? 'Unassigned',
      ]),
      [],
      ['Integrations'],
      ['Name', 'Type', 'Status', 'Owner'],
      ...integrations.map((integration) => [
        integration.name,
        integration.type,
        integration.status,
        integration.owner ?? '',
      ]),
    ];

    const csv = rows.map((row) => serializeCsvRow(row)).join('\n');
    const filename = `${report.name.replace(/[^a-z0-9-_]+/gi, '_')}.csv`;

    return { filename, csv };
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

function serializeCsvRow(values: Array<string | number | null | undefined>): string {
  return values
    .map((value) => {
      const stringValue = value === null || value === undefined ? '' : String(value);
      const escaped = stringValue.replace(/"/g, '""');
      return `"${escaped}"`;
    })
    .join(',');
}
