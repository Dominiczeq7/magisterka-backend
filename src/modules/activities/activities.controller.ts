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
import { ActivitiesService } from './activities.service';
import ActivitiesActivities from '../../entities/activities/activities.activities.entity';
import ActivitiesSubjects from '../../entities/activities/activities.subjects.entity';
import ActivitiesTypes from '../../entities/activities/activities.types.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(
    @Inject(ActivitiesService) private activitiesService: ActivitiesService,
  ) {}
  //-------------------------------------------------------------------
  // Subjects
  //-------------------------------------------------------------------
  @Get('/subjects')
  async getActivitiesSubjects(): Promise<ActivitiesSubjects[]> {
    return await this.activitiesService.getActivitiesSubjects();
  }

  @Get('/subjects/:id')
  async getActivitiesSubject(
    @Param('id') id: number,
  ): Promise<ActivitiesSubjects> {
    return await this.activitiesService.getActivitiesSubject(id);
  }

  @Post('/subjects')
  async addActivitiesSubject(
    @Body() activities_subject: ActivitiesSubjects,
  ): Promise<ActivitiesSubjects> {
    return await this.activitiesService.addActivitiesSubject(
      activities_subject,
    );
  }

  @Patch('/subjects/:id')
  async updateActivitiesSubject(
    @Param('id') id: number,
    @Body() fields: Partial<ActivitiesSubjects>,
  ): Promise<ActivitiesSubjects> {
    return await this.activitiesService.updateActivitiesSubject(id, fields);
  }

  @Delete('/subjects/:id')
  async removeActivitiesSubject(@Param('id') id: number): Promise<boolean> {
    return await this.activitiesService.removeActivitiesSubject(id);
  }
  //-------------------------------------------------------------------
  // Types
  //-------------------------------------------------------------------

  @Get('/types')
  async getActivitiesTypes(): Promise<ActivitiesTypes[]> {
    return await this.activitiesService.getActivitiesTypes();
  }

  @Get('/types/:id')
  async getActivitiesType(@Param('id') id: number): Promise<ActivitiesTypes> {
    return await this.activitiesService.getActivitiesType(id);
  }

  @Post('/types')
  async addActivitiesType(
    @Body() activitiesType: ActivitiesTypes,
  ): Promise<ActivitiesTypes> {
    return await this.activitiesService.addActivitiesType(activitiesType);
  }

  @Patch('/types/:id')
  async updateActivitiesType(
    @Param('id') id: number,
    @Body() fields: Partial<ActivitiesTypes>,
  ): Promise<ActivitiesTypes> {
    return await this.activitiesService.updateActivitiesType(id, fields);
  }

  @Delete('/types/:id')
  async removeActivitiesType(@Param('id') id: number): Promise<boolean> {
    return await this.activitiesService.removeActivitiesType(id);
  }

  //-------------------------------------------------------------------
  // Activities
  //-------------------------------------------------------------------

  @Get('/activities')
  async getActivitiesActivities(): Promise<ActivitiesActivities[]> {
    return await this.activitiesService.getActivitiesActivities();
  }

  @Get('/activities/:id')
  async getActivitiesActivity(
    @Param('id') id: number,
  ): Promise<ActivitiesActivities> {
    return await this.activitiesService.getActivitiesActivity(id);
  }

  @Post('/activities')
  async addActivitiesActivity(
    @Body() activitiesActivity: ActivitiesActivities,
  ): Promise<ActivitiesActivities> {
    return await this.activitiesService.addActivitiesActivity(
      activitiesActivity,
    );
  }

  @Patch('/activities/:id')
  async updateActivitiesActivity(
    @Param('id') id: number,
    @Body() fields: Partial<ActivitiesActivities>,
  ): Promise<ActivitiesActivities> {
    return await this.activitiesService.updateActivitiesActivity(id, fields);
  }

  @Delete('/activities/:id')
  async removeActivitiesActivity(@Param('id') id: number): Promise<boolean> {
    return await this.activitiesService.removeActivitiesActivity(id);
  }
}
