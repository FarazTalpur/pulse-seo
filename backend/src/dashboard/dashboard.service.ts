import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';

@Injectable()
export class DashboardService {
  constructor(private readonly mockDataService: MockDataService) {}

  getDashboard() {
    return this.mockDataService.readMockData('dashboard');
  }
}
