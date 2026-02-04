import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  getAutomations() {
    return this.automationsService.getAutomations();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createAutomation(@Request() req: AuthenticatedRequest, @Body() dto: CreateAutomationDto) {
    return this.automationsService.createAutomation(
      dto,
      req.user.organizationId,
      req.user.userId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateAutomation(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateAutomationDto,
  ) {
    return this.automationsService.updateAutomation(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  archiveAutomation(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.automationsService.archiveAutomation(id, req.user.organizationId);
  }

  @Post(':id/run')
  @UseGuards(JwtAuthGuard)
  runAutomation(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.automationsService.runAutomation(id, req.user.organizationId);
  }
}
