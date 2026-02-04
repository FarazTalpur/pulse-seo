import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { requireOrganizationId } from '../common/utils/require-organization';
import { formatDateLabel, formatRelativeTime } from '../common/utils/formatting';

@Injectable()
export class AuditsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAudits(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const auditRuns = await this.prisma.auditRun.findMany({
      where: {
        deletedAt: null,
        project: {
          organizationId: orgId,
        },
      },
      include: {
        project: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const issueCounts = await this.prisma.auditIssue.groupBy({
      by: ['severity'],
      _count: { _all: true },
      where: {
        auditRun: {
          project: {
            organizationId: orgId,
          },
        },
      },
    });

    const severityLookup = new Map(
      issueCounts.map((entry) => [entry.severity.toLowerCase(), entry._count._all]),
    );

    const issueBuckets = [
      { label: 'Critical', color: '#ff6b6b' },
      { label: 'High', color: '#ffb86b' },
      { label: 'Medium', color: '#6cf6ff' },
      { label: 'Low', color: '#9b7bff' },
    ].map((bucket) => ({
      ...bucket,
      count: severityLookup.get(bucket.label.toLowerCase()) ?? 0,
    }));

    const recommendations = await this.prisma.auditIssue.findMany({
      where: {
        auditRun: {
          project: {
            organizationId: orgId,
          },
        },
        recommendation: {
          not: null,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: {
        recommendation: true,
        title: true,
      },
    });

    return {
      issueBuckets,
      auditRuns: auditRuns.map((run) => ({
        site: run.project.domain || run.project.baseUrl || run.site || 'Unknown',
        status: run.status,
        issues: run.issuesCount ?? 0,
        score: run.score ?? 0,
        date: run.startedAt ? formatRelativeTime(run.startedAt) : formatDateLabel(run.createdAt),
      })),
      recommendations: recommendations.map(
        (item) => item.recommendation ?? item.title ?? 'Review audit insights',
      ),
    };
  }
}
