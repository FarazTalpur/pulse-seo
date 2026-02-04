import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BillingService } from './billing.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  getSubscription(@Query('organizationId') organizationId: string) {
    return this.billingService.getSubscription(organizationId);
  }

  @Post('subscription')
  updateSubscription(@Body() dto: UpdateSubscriptionDto) {
    return this.billingService.updateSubscription(dto);
  }

  @Post('portal')
  createPortal(@Body('organizationId') organizationId: string) {
    return this.billingService.createPortalSession(organizationId);
  }
}
