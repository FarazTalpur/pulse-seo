import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { requireOrganizationId } from '../common/utils/require-organization';
import {
  formatDateLabel,
  formatEtaLabel,
  formatNumber,
  formatRelativeTime,
} from '../common/utils/formatting';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);

    const [briefCount, openIssuesCount, criticalIssuesCount, scoreAggregate, keywordAggregate] =
      await Promise.all([
        this.prisma.contentBrief.count({
          where: {
            deletedAt: null,
            project: { organizationId: orgId },
          },
        }),
        this.prisma.auditIssue.count({
          where: {
            resolvedAt: null,
            auditRun: {
              project: { organizationId: orgId },
            },
          },
        }),
        this.prisma.auditIssue.count({
          where: {
            resolvedAt: null,
            severity: { equals: 'critical', mode: 'insensitive' },
            auditRun: {
              project: { organizationId: orgId },
            },
          },
        }),
        this.prisma.auditRun.aggregate({
          where: {
            deletedAt: null,
            score: { not: null },
            project: { organizationId: orgId },
          },
          _avg: { score: true },
        }),
        this.prisma.keyword.aggregate({
          where: {
            deletedAt: null,
            project: { organizationId: orgId },
          },
          _sum: { volume: true },
        }),
      ]);

    const avgScore = Math.round(scoreAggregate._avg.score ?? 0);
    const totalVolume = keywordAggregate._sum.volume ?? 0;
    const estimatedLift = Math.round(totalVolume * 0.35);

    const [alerts, briefs, automations, integrations, clusters, tasks, opportunities] =
      await Promise.all([
        this.prisma.notification.findMany({
          where: { organizationId: orgId },
          orderBy: { createdAt: 'desc' },
          take: 4,
        }),
        this.prisma.contentBrief.findMany({
          where: {
            deletedAt: null,
            project: { organizationId: orgId },
          },
          include: {
            project: true,
            user: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 4,
        }),
        this.prisma.automation.findMany({
          where: { deletedAt: null, organizationId: orgId },
          orderBy: { createdAt: 'desc' },
          take: 4,
        }),
        this.prisma.integration.findMany({
          where: { deletedAt: null, organizationId: orgId },
          orderBy: { createdAt: 'desc' },
          take: 4,
        }),
        this.prisma.keywordCluster.findMany({
          where: { deletedAt: null, project: { organizationId: orgId } },
          orderBy: { createdAt: 'desc' },
          take: 6,
        }),
        this.prisma.contentBrief.findMany({
          where: {
            deletedAt: null,
            project: { organizationId: orgId },
          },
          include: {
            project: true,
            user: true,
          },
          orderBy: { updatedAt: 'desc' },
          take: 5,
        }),
        this.prisma.auditIssue.findMany({
          where: {
            auditRun: {
              project: { organizationId: orgId },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 4,
        }),
      ]);

    return {
      stats: [
        {
          label: 'Visibility score',
          value: avgScore.toString(),
          note: 'Average audit score',
        },
        {
          label: 'Open issues',
          value: formatNumber(openIssuesCount),
          note: `${formatNumber(criticalIssuesCount)} critical`,
        },
        {
          label: 'Potential lift',
          value: `$${formatNumber(estimatedLift)}`,
          note: 'From tracked keyword volume',
        },
        {
          label: 'Active briefs',
          value: formatNumber(briefCount),
          note: 'Across active projects',
        },
      ],
      alerts: alerts.map((alert) => ({
        title: alert.title,
        detail: alert.message ?? alert.link ?? alert.type,
        time: formatRelativeTime(alert.createdAt),
        level: alert.level ?? 'low',
      })),
      tasks: tasks.map((brief) => ({
        title: brief.title,
        detail: brief.project?.name ?? 'Content brief',
        owner: brief.owner ?? brief.user?.name ?? 'Unassigned',
        status: brief.status,
      })),
      opportunities: opportunities.map((issue) => ({
        page: issue.url ?? issue.title,
        gain: `${issue.severity} priority`,
        reason: issue.recommendation ?? issue.description ?? 'Review issue details',
      })),
      briefs: briefs.map((brief) => ({
        title: brief.title,
        status: brief.status,
        eta: formatEtaLabel(brief.dueDate),
      })),
      clusters: clusters.map((cluster) => ({
        keyword: cluster.name,
        volume: formatNumber(cluster.volume),
        difficulty: formatNumber(cluster.difficulty),
        intent: cluster.intent ?? '—',
        trend: '—',
      })),
      automations: automations.map((automation) => ({
        title: automation.name,
        detail: automation.trigger ? `Trigger: ${automation.trigger}` : 'Manual trigger',
      })),
      integrations: integrations.map((integration) => ({
        title: integration.name,
        status: integration.status,
      })),
    };
  }
}
