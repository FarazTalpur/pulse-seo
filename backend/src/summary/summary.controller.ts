import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getSummary(@Request() req: AuthenticatedRequest) {
    return this.summaryService.getSummary(req.user.organizationId);
  }
}
