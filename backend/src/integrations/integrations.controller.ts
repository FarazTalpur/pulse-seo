import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { ConnectIntegrationDto } from './dto/connect-integration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE_ADMIN } from '../auth/constants/roles';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getIntegrations(@Request() req: AuthenticatedRequest) {
    return this.integrationsService.getIntegrations(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  createIntegration(@Request() req: AuthenticatedRequest, @Body() dto: CreateIntegrationDto) {
    return this.integrationsService.createIntegration(dto, req.user.organizationId);
  }

  @Post('gsc/connect')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  syncIntegration(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.integrationsService.syncIntegration(id, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  disconnectIntegration(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.integrationsService.disconnectIntegration(id, req.user.organizationId);
  }
}
