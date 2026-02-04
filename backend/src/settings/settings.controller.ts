import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  upsertSetting(@Request() req: AuthenticatedRequest, @Body() dto: UpsertSettingDto) {
    return this.settingsService.upsertSetting(dto, req.user.organizationId, req.user.userId);
  }
}
