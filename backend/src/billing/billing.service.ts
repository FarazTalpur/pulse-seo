import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  getSubscription(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    return this.prisma.organization.findUnique({
      where: { id: orgId },
      select: {
        id: true,
        name: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        subscriptionStatus: true,
      },
    });
  }

  updateSubscription(dto: UpdateSubscriptionDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
    return this.prisma.organization.update({
      where: { id: orgId },
      data: {
        stripeCustomerId: dto.stripeCustomerId,
        stripeSubscriptionId: dto.stripeSubscriptionId,
        subscriptionStatus: dto.subscriptionStatus,
      },
    });
  }

  createPortalSession(organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    return {
      organizationId: orgId,
      url: `https://billing.pulseseo.local/portal/${orgId}`,
    };
  }
}
