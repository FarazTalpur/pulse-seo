import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReports() {
    return this.reportsService.getReports();
  }

  @Post()
  createReport(@Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto);
  }

  @Post(':id/generate')
  generateReport(@Param('id') id: string) {
    return this.reportsService.generateReport(id);
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(id);
  }
}
