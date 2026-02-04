import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../database/prisma.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: { $queryRaw: async () => 1 },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('returns ok status', () => {
    expect(service.getHealth()).toEqual({ status: 'ok' });
  });
});
