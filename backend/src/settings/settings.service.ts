import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getSettings() {
    return this.mockDataService.readMockData('settings');
  }

  upsertSetting(dto: UpsertSettingDto) {
    return this.prisma.setting.upsert({
      where: {
        organizationId_userId_key: {
          organizationId: dto.organizationId,
          userId: dto.userId ?? null,
          key: dto.key,
        },
      },
      create: {
        organizationId: dto.organizationId,
        userId: dto.userId ?? null,
        key: dto.key,
        value: dto.value,
      },
      update: {
        value: dto.value,
      },
    });
  }
}
