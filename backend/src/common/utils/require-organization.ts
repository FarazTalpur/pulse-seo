import { ForbiddenException } from '@nestjs/common';

export function requireOrganizationId(organizationId: string | null): string {
  if (!organizationId) {
    throw new ForbiddenException('Organization context required');
  }
  return organizationId;
}
