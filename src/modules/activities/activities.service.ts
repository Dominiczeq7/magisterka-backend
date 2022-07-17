import { Injectable } from '@nestjs/common';
import ActivitiesActivities from '../../entities/activities/activities.activities.entity';
import ActivitiesSubjects from '../../entities/activities/activities.subjects.entity';
import ActivitiesTypes from '../../entities/activities/activities.types.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class ActivitiesService {
  //-------------------------------------------------------------------
  // Subjects
  //-------------------------------------------------------------------
  async getActivitiesSubjects(): Promise<ActivitiesSubjects[]> {
    return await ActivitiesSubjects.find();
  }

  async getActivitiesSubject(id: number): Promise<ActivitiesSubjects> {
    return await ActivitiesSubjects.findOne(id);
  }

  async addActivitiesSubject(
    activities_subject: ActivitiesSubjects,
  ): Promise<ActivitiesSubjects> {
    const id = (await ActivitiesSubjects.save(activities_subject)).id;
    const new_activities_subject = await this.getActivitiesSubject(id);
    return await new_activities_subject;
  }

  async updateActivitiesSubject(
    id: number,
    fields: Partial<ActivitiesSubjects>,
  ): Promise<ActivitiesSubjects> {
    const activities_subject = await ActivitiesSubjects.findOne(id);

    const activities_structure_to_update = updateFromPartial(
      activities_subject,
      fields,
    );
    await ActivitiesSubjects.save(activities_structure_to_update);
    const updated_activities_subject = await this.getActivitiesSubject(id);

    return await updated_activities_subject;
  }

  async removeActivitiesSubject(id: number): Promise<boolean> {
    const is_removed = (await ActivitiesSubjects.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // Types
  //-------------------------------------------------------------------

  async getActivitiesTypes(): Promise<ActivitiesTypes[]> {
    return await ActivitiesTypes.find();
  }

  async getActivitiesType(id: number): Promise<ActivitiesTypes> {
    return await ActivitiesTypes.findOne(id);
  }

  async addActivitiesType(
    activitiesType: ActivitiesTypes,
  ): Promise<ActivitiesTypes> {
    const id = (await ActivitiesTypes.save(activitiesType)).id;
    const new_activities_type = await this.getActivitiesType(id);
    return await new_activities_type;
  }

  async updateActivitiesType(
    id: number,
    fields: Partial<ActivitiesTypes>,
  ): Promise<ActivitiesTypes> {
    const activitiesType = await ActivitiesTypes.findOne(id);

    const activities_type_to_update = updateFromPartial(activitiesType, fields);
    await ActivitiesTypes.save(activities_type_to_update);
    const updated_activities_type = await this.getActivitiesType(id);

    return await updated_activities_type;
  }

  async removeActivitiesType(id: number): Promise<boolean> {
    const is_removed = (await ActivitiesTypes.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // Activities
  //-------------------------------------------------------------------

  async getActivitiesActivities(): Promise<ActivitiesActivities[]> {
    return await ActivitiesActivities.find({
      relations: [
        'subject',
        'teacher',
        'teacher.user',
        'activityType',
        'group',
        'demand',
      ],
    });
  }

  async getActivitiesActivity(id: number): Promise<ActivitiesActivities> {
    return await ActivitiesActivities.findOne(id, {
      relations: [
        'subject',
        'teacher',
        'teacher.user',
        'activityType',
        'group',
        'demand',
      ],
    });
  }

  async addActivitiesActivity(
    activitiesActivity: ActivitiesActivities,
  ): Promise<ActivitiesActivities> {
    const id = (await ActivitiesActivities.save(activitiesActivity)).id;
    const new_activities_activity = await this.getActivitiesActivity(id);
    return await new_activities_activity;
  }

  async updateActivitiesActivity(
    id: number,
    fields: Partial<ActivitiesActivities>,
  ): Promise<ActivitiesActivities> {
    const activitiesActivity = await ActivitiesActivities.findOne(id);

    const activities_activity_to_update = updateFromPartial(
      activitiesActivity,
      fields,
    );
    await ActivitiesActivities.save(activities_activity_to_update);
    const updated_activities_activity = await this.getActivitiesActivity(id);

    return await updated_activities_activity;
  }

  async removeActivitiesActivity(id: number): Promise<boolean> {
    const is_removed = (await ActivitiesActivities.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
