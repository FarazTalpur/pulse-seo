import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class ConnectIntegrationDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, unknown>;
}
