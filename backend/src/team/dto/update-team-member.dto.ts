import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  role: string;
}
