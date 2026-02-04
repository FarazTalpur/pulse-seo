import { IsOptional, IsString } from 'class-validator';

export class UpdateBriefDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;
}
