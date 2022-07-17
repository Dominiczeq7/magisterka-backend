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
import SchedulesSchedules from '../../entities/schedules/schedules.schedules.entity';
import SchedulesSemesters from '../../entities/schedules/schedules.semesters.entity';
import SchedulesStatuses from '../../entities/schedules/schedules.statuses.entity';
import SchedulesUnits from '../../entities/schedules/schedules.units.entity';
import SchedulesVersions from '../../entities/schedules/schedules.versions.entity';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(
    @Inject(SchedulesService) private schedulesService: SchedulesService,
  ) {}

  //// schedules
  @Get('/schedules')
  async getSchedules(): Promise<SchedulesSchedules[]> {
    return await this.schedulesService.getSchedules();
  }

  @Get('/schedules/:id')
  async getSchedule(@Param('id') id: number): Promise<SchedulesSchedules> {
    return await this.schedulesService.getSchedule(id);
  }

  @Post('/schedules')
  async addSchedule(
    @Body() schedule: SchedulesSchedules,
  ): Promise<SchedulesSchedules> {
    return await this.schedulesService.addSchedule(schedule);
  }

  @Patch('/schedules/:id')
  async updateSchedule(
    @Param('id') id: number,
    @Body() fields: Partial<SchedulesSchedules>,
  ): Promise<SchedulesSchedules> {
    return await this.schedulesService.updateSchedule(id, fields);
  }

  @Delete('/schedules/:id')
  async removeSchedule(@Param('id') id: number): Promise<boolean> {
    return await this.schedulesService.removeSchedule(id);
  }

  @Post('/generate')
  async generateSchedules(
    @Body() options: { revision_id: number; version_id: number },
  ): Promise<any[]> {
    return await this.schedulesService.generateSchedules(
      options.revision_id,
      options.version_id,
    );
  }

  //// Semesters
  @Get('/semesters')
  async getSemesters(): Promise<SchedulesSemesters[]> {
    return await this.schedulesService.getSemesters();
  }

  @Get('/semesters/:id')
  async getSemester(@Param('id') id: number): Promise<SchedulesSemesters> {
    return await this.schedulesService.getSemester(id);
  }

  @Post('/semesters')
  async addSemester(
    @Body() schedule: SchedulesSemesters,
  ): Promise<SchedulesSemesters> {
    return await this.schedulesService.addSemester(schedule);
  }

  @Patch('/semesters/:id')
  async updateSemester(
    @Param('id') id: number,
    @Body() fields: Partial<SchedulesSemesters>,
  ): Promise<SchedulesSemesters> {
    return await this.schedulesService.updateSemester(id, fields);
  }

  @Delete('/semesters/:id')
  async removeSemester(@Param('id') id: number): Promise<boolean> {
    return await this.schedulesService.removeSemester(id);
  }

  //// Statuses
  @Get('/statuses')
  async getStatuses(): Promise<SchedulesStatuses[]> {
    return await this.schedulesService.getStatuses();
  }

  @Get('/statuses/:id')
  async getStatus(@Param('id') id: number): Promise<SchedulesStatuses> {
    return await this.schedulesService.getStatus(id);
  }

  @Post('/statuses')
  async addStatus(
    @Body() schedule: SchedulesStatuses,
  ): Promise<SchedulesStatuses> {
    return await this.schedulesService.addStatus(schedule);
  }

  @Patch('/statuses/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() fields: Partial<SchedulesStatuses>,
  ): Promise<SchedulesStatuses> {
    return await this.schedulesService.updateStatus(id, fields);
  }

  @Delete('/statuses/:id')
  async removeStatus(@Param('id') id: number): Promise<boolean> {
    return await this.schedulesService.removeStatus(id);
  }

  //// Units
  @Get('/units')
  async getUnits(): Promise<SchedulesUnits[]> {
    return await this.schedulesService.getUnits();
  }

  @Get('/units/:id')
  async getUnit(@Param('id') id: number): Promise<SchedulesUnits> {
    return await this.schedulesService.getUnit(id);
  }

  //// Versions
  @Get('/versions')
  async getVersions(): Promise<SchedulesVersions[]> {
    return await this.schedulesService.getVersions();
  }

  @Get('/versions/:id')
  async getVersion(@Param('id') id: number): Promise<SchedulesVersions> {
    return await this.schedulesService.getVersion(id);
  }

  @Post('/versions')
  async addVersion(
    @Body() schedule: SchedulesVersions,
  ): Promise<SchedulesVersions> {
    return await this.schedulesService.addVersion(schedule);
  }

  @Patch('/versions/:id')
  async updateVersion(
    @Param('id') id: number,
    @Body() fields: Partial<SchedulesVersions>,
  ): Promise<SchedulesVersions> {
    return await this.schedulesService.updateVersion(id, fields);
  }

  @Delete('/versions/:id')
  async removeVersion(@Param('id') id: number): Promise<boolean> {
    return await this.schedulesService.removeVersion(id);
  }
}
