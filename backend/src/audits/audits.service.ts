import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';

@Injectable()
export class AuditsService {
  constructor(private readonly mockDataService: MockDataService) {}

  getAudits() {
    return this.mockDataService.readMockData('audits');
  }
}
