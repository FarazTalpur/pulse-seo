import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { ConnectIntegrationDto } from './dto/connect-integration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  getIntegrations() {
    return this.integrationsService.getIntegrations();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createIntegration(@Request() req: AuthenticatedRequest, @Body() dto: CreateIntegrationDto) {
    return this.integrationsService.createIntegration(dto, req.user.organizationId);
  }

  @Post('gsc/connect')
  @UseGuards(JwtAuthGuard)
  connectGsc(@Request() req: AuthenticatedRequest, @Body() dto: ConnectIntegrationDto) {
    const organizationId = req.user.organizationId;
    return this.integrationsService.createIntegration(
      {
        organizationId,
        type: 'google_search_console',
        name: dto.name,
        owner: dto.owner,
        config: dto.config,
        status: 'connected',
      },
      organizationId,
    );
  }

  @Post('ga4/connect')
  @UseGuards(JwtAuthGuard)
  connectGa4(@Request() req: AuthenticatedRequest, @Body() dto: ConnectIntegrationDto) {
    const organizationId = req.user.organizationId;
    return this.integrationsService.createIntegration(
      {
        organizationId,
        type: 'ga4',
        name: dto.name,
        owner: dto.owner,
        config: dto.config,
        status: 'connected',
      },
      organizationId,
    );
  }

  @Post(':id/sync')
  @UseGuards(JwtAuthGuard)
  syncIntegration(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.integrationsService.syncIntegration(id, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  disconnectIntegration(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.integrationsService.disconnectIntegration(id, req.user.organizationId);
  }
}
