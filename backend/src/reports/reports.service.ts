import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';

@Injectable()
export class ReportsService {
  constructor(private readonly mockDataService: MockDataService) {}

  getReports() {
    return this.mockDataService.readMockData('reports');
  }
}
