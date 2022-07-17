import { Test, TestingModule } from '@nestjs/testing';
import { ImportancesController } from './importances.controller';
import { ImportancesService } from './importances.service';

describe('ImportancesController', () => {
  let controller: ImportancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportancesController],
      providers: [ImportancesService],
    }).compile();

    controller = module.get<ImportancesController>(ImportancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
