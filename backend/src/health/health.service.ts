import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth() {
    return { status: 'ok' };
  }

  async getReady() {
    // Simple DB check
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ready' };
  }
}

