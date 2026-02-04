import { IsOptional, IsString } from 'class-validator';

export class UpdateAutomationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  trigger?: string;

  @IsString()
  @IsOptional()
  triggerType?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  owner?: string;
}
