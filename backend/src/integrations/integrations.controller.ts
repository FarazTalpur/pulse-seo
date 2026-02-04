import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { ConnectIntegrationDto } from './dto/connect-integration.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  getIntegrations() {
    return this.integrationsService.getIntegrations();
  }

  @Post()
  createIntegration(@Body() dto: CreateIntegrationDto) {
    return this.integrationsService.createIntegration(dto);
  }

  @Post('gsc/connect')
  connectGsc(@Body() dto: ConnectIntegrationDto) {
    return this.integrationsService.createIntegration({
      organizationId: dto.organizationId,
      type: 'google_search_console',
      name: dto.name,
      owner: dto.owner,
      config: dto.config,
      status: 'connected',
    });
  }

  @Post('ga4/connect')
  connectGa4(@Body() dto: ConnectIntegrationDto) {
    return this.integrationsService.createIntegration({
      organizationId: dto.organizationId,
      type: 'ga4',
      name: dto.name,
      owner: dto.owner,
      config: dto.config,
      status: 'connected',
    });
  }

  @Post(':id/sync')
  syncIntegration(@Param('id') id: string) {
    return this.integrationsService.syncIntegration(id);
  }

  @Delete(':id')
  disconnectIntegration(@Param('id') id: string) {
    return this.integrationsService.disconnectIntegration(id);
  }
}
