import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listProjects(@Request() req: AuthenticatedRequest) {
    return this.projectsService.listByOrganization(req.user.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createProject(@Request() req: AuthenticatedRequest, @Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto, req.user.organizationId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateProject(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, dto, req.user.organizationId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteProject(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.projectsService.deleteProject(id, req.user.organizationId);
  }
}
