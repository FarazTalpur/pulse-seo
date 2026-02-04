import { Injectable } from '@nestjs/common';
import { MockDataService } from '../shared/mock-data.service';

@Injectable()
export class SummaryService {
  constructor(private readonly mockDataService: MockDataService) {}

  getSummary() {
    return this.mockDataService.readMockData('summary');
  }
}
