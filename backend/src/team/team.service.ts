import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MockDataService } from '../shared/mock-data.service';
import { PrismaService } from '../database/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { requireOrganizationId } from '../common/utils/require-organization';

@Injectable()
export class TeamService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly prisma: PrismaService,
  ) {}

  getTeam() {
    return this.mockDataService.readMockData('team');
  }

  async createMember(dto: CreateTeamMemberDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    if (dto.organizationId && dto.organizationId !== orgId) {
      throw new ForbiddenException('Organization mismatch');
    }
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
          organizationId: orgId,
        },
      },
      update: {
        role: dto.role,
      },
      create: {
        userId: user.id,
        organizationId: orgId,
        role: dto.role,
      },
    });

    return { user, membership };
  }

  async updateMember(memberId: string, dto: UpdateTeamMemberDto, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureMembershipInOrg(memberId, orgId);
    return this.prisma.userOrganization.update({
      where: { id: memberId },
      data: { role: dto.role },
    });
  }

  async removeMember(memberId: string, organizationId: string | null) {
    const orgId = requireOrganizationId(organizationId);
    await this.ensureMembershipInOrg(memberId, orgId);
    return this.prisma.userOrganization.delete({
      where: { id: memberId },
    });
  }

  private async ensureMembershipInOrg(memberId: string, organizationId: string) {
    const membership = await this.prisma.userOrganization.findFirst({
      where: {
        id: memberId,
        organizationId,
      },
    });

    if (!membership) {
      throw new NotFoundException('Team member not found');
    }

    return membership;
  }
}
