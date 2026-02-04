import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE_ADMIN } from '../auth/constants/roles';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getTeam(@Request() req: AuthenticatedRequest) {
    return this.teamService.getTeam(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  createMember(@Request() req: AuthenticatedRequest, @Body() dto: CreateTeamMemberDto) {
    return this.teamService.createMember(dto, req.user.organizationId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  updateMember(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    return this.teamService.updateMember(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ADMIN)
  removeMember(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.teamService.removeMember(id, req.user.organizationId);
  }
}
