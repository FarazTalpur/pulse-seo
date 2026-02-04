import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WRITE_ROLES } from '../auth/constants/roles';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getReports(@Request() req: AuthenticatedRequest) {
    return this.reportsService.getReports(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  createReport(@Request() req: AuthenticatedRequest, @Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto, req.user.organizationId);
  }

  @Post(':id/generate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  generateReport(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.reportsService.generateReport(id, req.user.organizationId);
  }

  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  async downloadReport(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const { filename, csv } = await this.reportsService.buildReportCsv(
      id,
      req.user.organizationId,
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...WRITE_ROLES)
  deleteReport(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.reportsService.deleteReport(id, req.user.organizationId);
  }
}
