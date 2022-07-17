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
import ImportancesAbsences from '../../entities/importances/importances.absences.entity';
import ImportancesClasses from '../../entities/importances/importances.classes.entity';
import ImportancesDemands from '../../entities/importances/importances.demands.entity';
import ImportancesEquipments from '../../entities/importances/importances.equipments.entity';
import { ImportancesService } from './importances.service';

@Controller('importances')
export class ImportancesController {
  constructor(
    @Inject(ImportancesService) private importancesService: ImportancesService,
  ) {}
  //----------------------------------------------
  // demands
  //----------------------------------------------
  @Get('/demands')
  async getImportancesDemands(): Promise<ImportancesDemands[]> {
    return await this.importancesService.getImportancesDemands();
  }

  @Get('/demands/:id')
  async getImportancesDemand(
    @Param('id') id: number,
  ): Promise<ImportancesDemands> {
    return await this.importancesService.getImportancesDemand(id);
  }

  @Post('/demands')
  async addImportancesDemand(
    @Body() demand: ImportancesDemands,
  ): Promise<ImportancesDemands> {
    return await this.importancesService.addImportancesDemand(demand);
  }

  @Patch('/demands/:id')
  async updateImportancesDemand(
    @Param('id') id: number,
    @Body() fields: Partial<ImportancesDemands>,
  ): Promise<ImportancesDemands> {
    return await this.importancesService.updateImportancesDemand(id, fields);
  }

  @Delete('/demands/:id')
  async removeImportancesDemand(@Param('id') id: number): Promise<boolean> {
    return await this.importancesService.removeImportancesDemand(id);
  }

  //----------------------------------------------
  //classes
  //----------------------------------------------
  @Get('/classes')
  async getImportancesClasses(): Promise<ImportancesClasses[]> {
    return await this.importancesService.getImportancesClasses();
  }

  @Get('/classes/:id')
  async getImportancesClass(
    @Param('id') id: number,
  ): Promise<ImportancesClasses> {
    return await this.importancesService.getImportancesClass(id);
  }

  @Post('/classes')
  async addImportancesClass(
    @Body() ImClass: ImportancesClasses,
  ): Promise<ImportancesClasses> {
    return await this.importancesService.addImportancesClass(ImClass);
  }

  @Patch('/classes/:id')
  async updateImportancesClass(
    @Param('id') id: number,
    @Body() fields: Partial<ImportancesClasses>,
  ): Promise<ImportancesClasses> {
    return await this.importancesService.updateImportancesClass(id, fields);
  }

  @Delete('/classes/:id')
  async removeImportancesClass(@Param('id') id: number): Promise<boolean> {
    return await this.importancesService.removeImportancesClass(id);
  }

  //----------------------------------------------
  //equipments
  //----------------------------------------------
  @Get('/equipment')
  async getImportancesEquipments(): Promise<ImportancesEquipments[]> {
    return await this.importancesService.getImportancesEquipments();
  }

  @Get('/equipment/:id')
  async getImportancesEquipment(
    @Param('id') id: number,
  ): Promise<ImportancesEquipments> {
    return await this.importancesService.getImportancesEquipment(id);
  }

  @Post('/equipment')
  async addImportancesEquipment(
    @Body() equipment: ImportancesEquipments,
  ): Promise<ImportancesEquipments> {
    return await this.importancesService.addImportancesEquipment(equipment);
  }

  @Patch('/equipment/:id')
  async updateImportancesEquipment(
    @Param('id') id: number,
    @Body() fields: Partial<ImportancesEquipments>,
  ): Promise<ImportancesEquipments> {
    return await this.importancesService.updateImportancesEquipment(id, fields);
  }

  @Delete('/equipment/:id')
  async removeImportancesEquipment(@Param('id') id: number): Promise<boolean> {
    return await this.importancesService.removeImportancesEquipment(id);
  }

  //----------------------------------------------
  //absences
  //----------------------------------------------
  @Get('/absences')
  async getImportancesAbsences(): Promise<ImportancesAbsences[]> {
    return await this.importancesService.getImportancesAbsences();
  }

  @Get('/absences/:id')
  async getImportancesAbsence(
    @Param('id') id: number,
  ): Promise<ImportancesAbsences> {
    return await this.importancesService.getImportancesAbsence(id);
  }

  @Post('/absences')
  async addImportancesAbsence(
    @Body() absence: ImportancesAbsences,
  ): Promise<ImportancesAbsences> {
    return await this.importancesService.addImportancesAbsence(absence);
  }

  @Patch('/absences/:id')
  async updateImportancesAbsence(
    @Param('id') id: number,
    @Body() fields: Partial<ImportancesAbsences>,
  ): Promise<ImportancesAbsences> {
    return await this.importancesService.updateImportancesAbsence(id, fields);
  }

  @Delete('/absences/:id')
  async removeImportancesAbsence(@Param('id') id: number): Promise<boolean> {
    return await this.importancesService.removeImportancesAbsence(id);
  }
}
