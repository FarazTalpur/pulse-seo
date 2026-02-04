import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAudits(@Request() req: AuthenticatedRequest) {
    return this.auditsService.getAudits(req.user.organizationId);
  }
}
