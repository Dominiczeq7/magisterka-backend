import { Injectable } from '@nestjs/common';
import { schedulingAlgorithm } from 'src/utils/schedulingAlgorithm';
import SchedulesSchedules from '../../entities/schedules/schedules.schedules.entity';
import SchedulesSemesters from '../../entities/schedules/schedules.semesters.entity';
import SchedulesStatuses from '../../entities/schedules/schedules.statuses.entity';
import SchedulesUnits from '../../entities/schedules/schedules.units.entity';
import SchedulesVersions from '../../entities/schedules/schedules.versions.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class SchedulesService {
  /////schedules
  async getSchedules(): Promise<SchedulesSchedules[]> {
    return await SchedulesSchedules.find({
      relations: ['activity', 'version', 'classroom'],
    });
  }

  async getSchedule(id: number): Promise<SchedulesSchedules> {
    return await SchedulesSchedules.findOne(id, {
      relations: ['activity', 'version', 'classroom'],
    });
  }

  async addSchedule(schedule: SchedulesSchedules): Promise<SchedulesSchedules> {
    const id = (await SchedulesSchedules.save(schedule)).id;
    const new_schedule = await this.getSchedule(id);
    return await new_schedule;
  }

  async updateSchedule(
    id: number,
    fields: Partial<SchedulesSchedules>,
  ): Promise<SchedulesSchedules> {
    const schedule = await SchedulesSchedules.findOne(id);

    const schedule_to_update = updateFromPartial(schedule, fields);
    await SchedulesSchedules.save(schedule_to_update);
    const updated_schedule = await this.getSchedule(id);

    return await updated_schedule;
  }

  async removeSchedule(id: number): Promise<boolean> {
    const is_removed = (await SchedulesSchedules.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  async generateSchedules(
    revision_id: number,
    version_id: number,
  ): Promise<any[]> {
    const schedules = await schedulingAlgorithm(revision_id, version_id);
    return schedules;
  }

  /////semesters
  async getSemesters(): Promise<SchedulesSemesters[]> {
    return await SchedulesSemesters.find();
  }

  async getSemester(id: number): Promise<SchedulesSemesters> {
    return await SchedulesSemesters.findOne(id);
  }

  async addSemester(schedule: SchedulesSemesters): Promise<SchedulesSemesters> {
    const id = (await SchedulesSemesters.save(schedule)).id;
    const new_schedule = await this.getSemester(id);
    return await new_schedule;
  }

  async updateSemester(
    id: number,
    fields: Partial<SchedulesSemesters>,
  ): Promise<SchedulesSemesters> {
    const schedule = await SchedulesSemesters.findOne(id);

    const schedule_to_update = updateFromPartial(schedule, fields);
    await SchedulesSemesters.save(schedule_to_update);
    const updated_schedule = await this.getSemester(id);

    return await updated_schedule;
  }

  async removeSemester(id: number): Promise<boolean> {
    const is_removed = (await SchedulesSemesters.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  /////statuses
  async getStatuses(): Promise<SchedulesStatuses[]> {
    return await SchedulesStatuses.find();
  }

  async getStatus(id: number): Promise<SchedulesStatuses> {
    return await SchedulesStatuses.findOne(id);
  }

  async addStatus(schedule: SchedulesStatuses): Promise<SchedulesStatuses> {
    const id = (await SchedulesStatuses.save(schedule)).id;
    const new_schedule = await this.getStatus(id);
    return await new_schedule;
  }

  async updateStatus(
    id: number,
    fields: Partial<SchedulesStatuses>,
  ): Promise<SchedulesStatuses> {
    const schedule = await SchedulesStatuses.findOne(id);

    const schedule_to_update = updateFromPartial(schedule, fields);
    await SchedulesStatuses.save(schedule_to_update);
    const updated_schedule = await this.getStatus(id);

    return await updated_schedule;
  }

  async removeStatus(id: number): Promise<boolean> {
    const is_removed = (await SchedulesStatuses.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  /////units
  async getUnits(): Promise<SchedulesUnits[]> {
    return await SchedulesUnits.find();
  }

  async getUnit(id: number): Promise<SchedulesUnits> {
    return await SchedulesUnits.findOne(id);
  }

  /////versions
  async getVersions(): Promise<SchedulesVersions[]> {
    return await SchedulesVersions.find({
      relations: ['status'],
    });
  }

  async getVersion(id: number): Promise<SchedulesVersions> {
    return await SchedulesVersions.findOne(id, {
      relations: ['status'],
    });
  }

  async addVersion(schedule: SchedulesVersions): Promise<SchedulesVersions> {
    const id = (await SchedulesVersions.save(schedule)).id;
    const new_schedule = await this.getVersion(id);
    return await new_schedule;
  }

  async updateVersion(
    id: number,
    fields: Partial<SchedulesVersions>,
  ): Promise<SchedulesVersions> {
    const schedule = await SchedulesVersions.findOne(id);

    const schedule_to_update = updateFromPartial(schedule, fields);
    await SchedulesVersions.save(schedule_to_update);
    const updated_schedule = await this.getVersion(id);

    return await updated_schedule;
  }

  async removeVersion(id: number): Promise<boolean> {
    const is_removed = (await SchedulesVersions.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
