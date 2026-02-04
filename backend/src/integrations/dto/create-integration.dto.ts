import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateIntegrationDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, unknown>;
}
