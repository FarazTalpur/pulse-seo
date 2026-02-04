import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';

@Injectable()
export class BriefsService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getBriefs() {
    return this.mockDataService.readMockData('briefs');
  }

  createBrief(dto: CreateBriefDto) {
    return this.prisma.contentBrief.create({
      data: {
        projectId: dto.projectId,
        title: dto.title,
        type: dto.type,
        status: dto.status,
        owner: dto.owner,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  updateBrief(id: string, dto: UpdateBriefDto) {
    return this.prisma.contentBrief.update({
      where: { id },
      data: {
        title: dto.title,
        type: dto.type,
        status: dto.status,
        owner: dto.owner,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  archiveBrief(id: string) {
    return this.prisma.contentBrief.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
