import { Module } from '@nestjs/common';
import { ImportancesController } from './importances.controller';
import { ImportancesService } from './importances.service';

@Module({
  controllers: [ImportancesController],
  providers: [ImportancesService],
})
export class ImportancesModule {}
