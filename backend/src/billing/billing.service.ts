import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  getSubscription(organizationId: string) {
    return this.prisma.organization.findUnique({
      where: { id: organizationId },
      select: {
        id: true,
        name: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        subscriptionStatus: true,
      },
    });
  }

  updateSubscription(dto: UpdateSubscriptionDto) {
    return this.prisma.organization.update({
      where: { id: dto.organizationId },
      data: {
        stripeCustomerId: dto.stripeCustomerId,
        stripeSubscriptionId: dto.stripeSubscriptionId,
        subscriptionStatus: dto.subscriptionStatus,
      },
    });
  }

  createPortalSession(organizationId: string) {
    return {
      organizationId,
      url: `https://billing.pulseseo.local/portal/${organizationId}`,
    };
  }
}
