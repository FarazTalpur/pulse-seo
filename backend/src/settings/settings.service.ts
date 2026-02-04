import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { requireOrganizationId } from '../common/utils/require-organization';
import { humanizeKey } from '../common/utils/formatting';

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getSettings(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    const settings = await this.prisma.setting.findMany({
      where: {
        organizationId: orgId,
        userId: null,
      },
      orderBy: { key: 'asc' },
    });

    const notificationSettings = await this.prisma.setting.findMany({
      where: {
        organizationId: orgId,
        key: {
          startsWith: 'notification.',
        },
      },
      orderBy: { key: 'asc' },
    });

    return {
      settings: settings
        .filter((item) => !item.key.startsWith('notification.'))
        .map((item) => ({
          label: humanizeKey(item.key),
          value: item.value,
        })),
      notifications: notificationSettings.map((item) =>
        humanizeKey(item.key.replace(/^notification\./, '')),
      ),
    };
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
