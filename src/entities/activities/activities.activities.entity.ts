import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  RelationOptions,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import GroupsGroups from '../groups/groups.groups.entity';
import ImportancesDemands from '../importances/importances.demands.entity';
import SchedulesSchedules from '../schedules/schedules.schedules.entity';
import UsersTeachers from '../users/users.teachers.entity';
import ActivitiesSubjects from './activities.subjects.entity';
import ActivitiesTypes from './activities.types.entity';
@Entity()
export class ActivitiesActivities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ActivitiesSubjects, (entity) => entity.activity, {
    nullable: false,
  } as RelationOptions)
  subject: ActivitiesSubjects;

  @ManyToOne((type) => UsersTeachers, (entity) => entity.activity, {
    nullable: true,
  } as RelationOptions)
  teacher: UsersTeachers;

  @ManyToOne((type) => ActivitiesTypes, (entity) => entity.activity, {
    nullable: false,
  } as RelationOptions)
  activityType: ActivitiesTypes;

  @ManyToOne((type) => GroupsGroups, (entity) => entity.activity, {
    nullable: false,
  } as RelationOptions)
  group: GroupsGroups;

  @ManyToOne((type) => ImportancesDemands, (entity) => entity.activity, {
    nullable: true,
  } as RelationOptions)
  demand: ImportancesDemands;

  @OneToMany((type) => SchedulesSchedules, (entity) => entity.activity)
  schedule: SchedulesSchedules[];

  @Column()
  numberOfHours: number;
}

export default ActivitiesActivities;
