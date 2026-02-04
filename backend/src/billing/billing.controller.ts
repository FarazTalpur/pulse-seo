import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  getSubscription(@Request() req: AuthenticatedRequest) {
    return this.billingService.getSubscription(req.user.organizationId);
  }

  @Post('subscription')
  @UseGuards(JwtAuthGuard)
  updateSubscription(@Request() req: AuthenticatedRequest, @Body() dto: UpdateSubscriptionDto) {
    return this.billingService.updateSubscription(dto, req.user.organizationId);
  }

  @Post('portal')
  @UseGuards(JwtAuthGuard)
  createPortal(@Request() req: AuthenticatedRequest) {
    return this.billingService.createPortalSession(req.user.organizationId);
  }
}
