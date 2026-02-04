import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getTeam() {
    return this.teamService.getTeam();
  }

  @Post()
  createMember(@Body() dto: CreateTeamMemberDto) {
    return this.teamService.createMember(dto);
  }

  @Patch(':id')
  updateMember(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.teamService.updateMember(id, dto);
  }

  @Delete(':id')
  removeMember(@Param('id') id: string) {
    return this.teamService.removeMember(id);
  }
}
