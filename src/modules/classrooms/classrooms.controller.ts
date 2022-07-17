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
import ClassroomsClassrooms from '../../entities/classrooms/classrooms.classrooms.entity';
import ClassroomsEquipment from '../../entities/classrooms/classrooms.equipments.entity';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController {
  constructor(
    @Inject(ClassroomsService) private classroomsService: ClassroomsService,
  ) {}
  //-------------------------------------------------------------------
  // Classrooms
  //-------------------------------------------------------------------
  @Get('/classrooms')
  async getClassrooms(): Promise<ClassroomsClassrooms[]> {
    return await this.classroomsService.getClassrooms();
  }

  @Get('/classrooms/:id')
  async getClassroom(@Param('id') id: number): Promise<ClassroomsClassrooms> {
    return await this.classroomsService.getClassroom(id);
  }

  @Post('/classrooms')
  async addClassroom(
    @Body() classrooms: ClassroomsClassrooms,
  ): Promise<ClassroomsClassrooms> {
    return await this.classroomsService.addClassroom(classrooms);
  }

  @Patch('/classrooms/:id')
  async updateClassroom(
    @Param('id') id: number,
    @Body() fields: Partial<ClassroomsClassrooms>,
  ): Promise<ClassroomsClassrooms> {
    return await this.classroomsService.updateClassroom(id, fields);
  }

  @Delete('/classrooms/:id')
  async removeClassroom(@Param('id') id: number): Promise<boolean> {
    return await this.classroomsService.removeClassroom(id);
  }
  //-------------------------------------------------------------------
  // Equipment
  //-------------------------------------------------------------------
  @Get('/equipment')
  async getAllEquipment(): Promise<ClassroomsEquipment[]> {
    return await this.classroomsService.getAllEquipment();
  }

  @Get('/equipment/:id')
  async getEquipment(@Param('id') id: number): Promise<ClassroomsEquipment> {
    return await this.classroomsService.getEquipment(id);
  }

  @Post('/equipment')
  async addEquipment(
    @Body() equipment: ClassroomsEquipment,
  ): Promise<ClassroomsEquipment> {
    return await this.classroomsService.addEquipment(equipment);
  }

  @Patch('/equipment/:id')
  async updateEquipment(
    @Param('id') id: number,
    @Body() fields: Partial<ClassroomsEquipment>,
  ): Promise<ClassroomsEquipment> {
    return await this.classroomsService.updateEquipment(id, fields);
  }

  @Delete('/equipment/:id')
  async removeEquipment(@Param('id') id: number): Promise<boolean> {
    return await this.classroomsService.removeEquipment(id);
  }
}
