import { Test, TestingModule } from '@nestjs/testing';
import { ImportancesService } from './importances.service';

describe('ImportancesService', () => {
  let service: ImportancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportancesService],
    }).compile();

    service = module.get<ImportancesService>(ImportancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
