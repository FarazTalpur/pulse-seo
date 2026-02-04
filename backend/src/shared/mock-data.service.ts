import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MockDataService {
  private readonly mockDataPath = path.join(process.cwd(), 'mock-data');

  readMockData<T>(filename: string): T {
    const filePath = path.join(this.mockDataPath, `${filename}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }
}

