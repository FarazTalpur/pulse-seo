import { IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  stripeCustomerId?: string;

  @IsString()
  @IsOptional()
  stripeSubscriptionId?: string;

  @IsString()
  @IsOptional()
  subscriptionStatus?: string;
}
