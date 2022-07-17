import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import SchedulesSchedules from './schedules.schedules.entity';

@Entity()
export class SchedulesSemesters extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  revision_number: number;

  @Column()
  date_from: Date;

  @Column()
  date_to: Date;

  @OneToMany((type) => SchedulesSchedules, (entity) => entity.version, {
    nullable: false,
  } as RelationOptions)
  schedule: SchedulesSchedules;
}

export default SchedulesSemesters;
