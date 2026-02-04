import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getTeam() {
    return this.mockDataService.readMockData('team');
  }

  async createMember(dto: CreateTeamMemberDto) {
    const passwordHash = await bcrypt.hash(dto.tempPassword ?? 'changeme1234', 10);
    const user = await this.prisma.user.upsert({
      where: { email: dto.email },
      update: {
        name: dto.name ?? undefined,
      },
      create: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        emailVerified: false,
      },
    });

    const membership = await this.prisma.userOrganization.upsert({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: dto.organizationId,
        },
      },
      update: {
        role: dto.role,
      },
      create: {
        userId: user.id,
        organizationId: dto.organizationId,
        role: dto.role,
      },
    });

    return { user, membership };
  }

  updateMember(memberId: string, dto: UpdateTeamMemberDto) {
    return this.prisma.userOrganization.update({
      where: { id: memberId },
      data: { role: dto.role },
    });
  }

  removeMember(memberId: string) {
    return this.prisma.userOrganization.delete({
      where: { id: memberId },
    });
  }
}
