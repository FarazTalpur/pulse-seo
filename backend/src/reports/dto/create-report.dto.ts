import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  cadence?: string;

  @IsString()
  @IsOptional()
  recipients?: string;
}
