import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getTeam() {
    return this.teamService.getTeam();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createMember(@Request() req: AuthenticatedRequest, @Body() dto: CreateTeamMemberDto) {
    return this.teamService.createMember(dto, req.user.organizationId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateMember(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    return this.teamService.updateMember(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeMember(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.teamService.removeMember(id, req.user.organizationId);
  }
}
