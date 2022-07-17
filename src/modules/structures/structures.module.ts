import { Module } from '@nestjs/common';
import { StructuresController } from './structures.controller';
import { StructuresService } from './structures.service';

@Module({
  controllers: [StructuresController],
  providers: [StructuresService]
})
export class StructuresModule {}
