import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApp(): string {
    const testString = 'Magisterka-Backend działa!';
    return testString;
  }
}
