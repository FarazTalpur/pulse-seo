import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAutomationDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  trigger: string;

  @IsString()
  @IsNotEmpty()
  triggerType: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  owner?: string;
}
