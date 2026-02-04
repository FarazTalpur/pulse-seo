import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WRITE_ROLES } from '../auth/constants/roles';

@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAutomations(@Request() req: AuthenticatedRequest) {
    return this.automationsService.getAutomations(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  createAutomation(@Request() req: AuthenticatedRequest, @Body() dto: CreateAutomationDto) {
    return this.automationsService.createAutomation(
      dto,
      req.user.organizationId,
      req.user.userId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  updateAutomation(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateAutomationDto,
  ) {
    return this.automationsService.updateAutomation(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  archiveAutomation(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.automationsService.archiveAutomation(id, req.user.organizationId);
  }

  @Post(':id/run')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  runAutomation(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.automationsService.runAutomation(id, req.user.organizationId);
  }
}
