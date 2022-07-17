import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import StructuresStructures from '../../entities/structures/structures.structures.entity';
import { StructuresService } from './structures.service';

@Controller('structures')
export class StructuresController {
  constructor(
    @Inject(StructuresService) private structuresService: StructuresService,
  ) {}

  @Get('/structures')
  async getStructures(): Promise<StructuresStructures[]> {
    return await this.structuresService.getStructures();
  }

  @Get('/structures/:id')
  async getStructure(@Param('id') id: number): Promise<StructuresStructures> {
    return await this.structuresService.getStructure(id);
  }

  @Post('/structures')
  async addStructure(
    @Body() structure: StructuresStructures,
  ): Promise<StructuresStructures> {
    return await this.structuresService.addStructure(structure);
  }

  @Patch('/structures/:id')
  async updateStructure(
    @Param('id') id: number,
    @Body() fields: Partial<StructuresStructures>,
  ): Promise<StructuresStructures> {
    return await this.structuresService.updateStructure(id, fields);
  }

  @Delete('/structures/:id')
  async removeStructure(@Param('id') id: number): Promise<boolean> {
    return await this.structuresService.removeStructure(id);
  }
}
