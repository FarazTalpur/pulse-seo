import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  tempPassword?: string;
}
