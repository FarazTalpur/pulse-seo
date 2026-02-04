import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WRITE_ROLES } from '../auth/constants/roles';

@Controller('briefs')
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getBriefs(@Request() req: AuthenticatedRequest) {
    return this.briefsService.getBriefs(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  createBrief(@Request() req: AuthenticatedRequest, @Body() dto: CreateBriefDto) {
    return this.briefsService.createBrief(dto, req.user.organizationId, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  updateBrief(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateBriefDto,
  ) {
    return this.briefsService.updateBrief(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  archiveBrief(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.briefsService.archiveBrief(id, req.user.organizationId);
  }
}
