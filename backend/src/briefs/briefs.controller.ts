import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('briefs')
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  @Get()
  getBriefs() {
    return this.briefsService.getBriefs();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createBrief(@Request() req: AuthenticatedRequest, @Body() dto: CreateBriefDto) {
    return this.briefsService.createBrief(dto, req.user.organizationId, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateBrief(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateBriefDto,
  ) {
    return this.briefsService.updateBrief(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  archiveBrief(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.briefsService.archiveBrief(id, req.user.organizationId);
  }
}
