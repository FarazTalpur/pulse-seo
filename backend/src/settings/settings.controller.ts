import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE_ADMIN } from '../auth/constants/roles';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getSettings(@Request() req: AuthenticatedRequest) {
    return this.settingsService.getSettings(req.user.organizationId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  upsertSetting(@Request() req: AuthenticatedRequest, @Body() dto: UpsertSettingDto) {
    return this.settingsService.upsertSetting(dto, req.user.organizationId, req.user.userId);
  }
}
