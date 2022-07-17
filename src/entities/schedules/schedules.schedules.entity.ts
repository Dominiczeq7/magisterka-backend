import ActivitiesActivities from '../../entities/activities/activities.activities.entity';
import ClassroomsClassrooms from '../../entities/classrooms/classrooms.classrooms.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationOptions,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import SchedulesSemesters from './schedules.semesters.entity';
import SchedulesVersions from './schedules.versions.entity';

@Entity()
export class SchedulesSchedules extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ActivitiesActivities, (entity) => entity.schedule, {
    nullable: false,
  } as RelationOptions)
  activity: ActivitiesActivities;

  @Column()
  date_from: Date;

  @Column('double', { precision: 4, scale: 2 })
  duration: number;

  @ManyToOne((type) => SchedulesVersions, (entity) => entity.schedule, {
    nullable: false,
  } as RelationOptions)
  version: SchedulesVersions;

  @ManyToOne((type) => ClassroomsClassrooms, (entity) => entity.schedule, {
    nullable: true,
  } as RelationOptions)
  classroom: ClassroomsClassrooms;

  @ManyToOne((type) => SchedulesSemesters, (entity) => entity.schedule, {
    nullable: false,
  } as RelationOptions)
  semester: SchedulesSemesters;
}

export default SchedulesSchedules;
