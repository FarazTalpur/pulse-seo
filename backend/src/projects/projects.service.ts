import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  listByOrganization(organizationId: string) {
    return this.prisma.project.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createProject(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        domain: dto.domain,
        baseUrl: dto.baseUrl,
      },
    });
  }

  updateProject(id: string, dto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        name: dto.name,
        domain: dto.domain,
        baseUrl: dto.baseUrl,
      },
    });
  }

  async deleteProject(id: string) {
    return this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
