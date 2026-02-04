import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReports() {
    return this.reportsService.getReports();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createReport(@Request() req: AuthenticatedRequest, @Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto, req.user.organizationId);
  }

  @Post(':id/generate')
  @UseGuards(JwtAuthGuard)
  generateReport(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.reportsService.generateReport(id, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteReport(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.reportsService.deleteReport(id, req.user.organizationId);
  }
}
