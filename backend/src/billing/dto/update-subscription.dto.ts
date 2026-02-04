import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;

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
