import { ForbiddenException, Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class SettingsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getSettings() {
    return this.mockDataService.readMockData('settings');
  }

  upsertSetting(dto: UpsertSettingDto, organizationId: string | null, userId: string) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    if (dto.userId && dto.userId !== userId) {
      throw new ForbiddenException('User mismatch');
    }
    const settingUserId = dto.userId ?? null;
    return this.prisma.setting.upsert({
      where: {
        organizationId_userId_key: {
          organizationId: orgId,
          userId: settingUserId,
          key: dto.key,
        },
      },
      create: {
        organizationId: orgId,
        userId: settingUserId,
        key: dto.key,
        value: dto.value,
      },
      update: {
        value: dto.value,
      },
    });
  }
}
