import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { requireOrganizationId } from '../common/utils/require-organization';
import { formatDateLabel } from '../common/utils/formatting';

@Injectable()
export class SummaryService {
  constructor(private readonly configService: ConfigService) {}

  getSummary(organizationId: string | null) {
    requireOrganizationId(organizationId);
    const version =
      this.configService.get<string>('APP_VERSION') ??
      process.env.npm_package_version ??
      '0.1.0';
    return {
      version,
      updated: formatDateLabel(new Date()),
      notes: 'Live data backed by the production database.',
    };
  }
}
