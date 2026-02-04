import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuditsModule } from './audits/audits.module';
import { BriefsModule } from './briefs/briefs.module';
import { ReportsModule } from './reports/reports.module';
import { AutomationsModule } from './automations/automations.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { TeamModule } from './team/team.module';
import { SettingsModule } from './settings/settings.module';
import { SummaryModule } from './summary/summary.module';
import { MockDataService } from './shared/mock-data.service';
import { ProjectsModule } from './projects/projects.module';
import { AutomationJobsModule } from './automation-jobs/automation-jobs.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    DashboardModule,
    ProjectsModule,
    AuditsModule,
    BriefsModule,
    ReportsModule,
    AutomationsModule,
    AutomationJobsModule,
    IntegrationsModule,
    BillingModule,
    TeamModule,
    SettingsModule,
    SummaryModule,
  ],
  providers: [MockDataService],
  exports: [MockDataService],
})
export class AppModule {}

