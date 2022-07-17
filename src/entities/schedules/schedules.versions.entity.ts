import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import SchedulesSchedules from './schedules.schedules.entity';
import SchedulesStatuses from './schedules.statuses.entity';

@Entity()
export class SchedulesVersions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @ManyToOne((type) => SchedulesStatuses, (entity) => entity.version, {
    nullable: false,
  } as RelationOptions)
  status: SchedulesStatuses;

  @OneToMany((type) => SchedulesSchedules, (entity) => entity.version, {
    nullable: false,
  } as RelationOptions)
  schedule: SchedulesSchedules;
}

export default SchedulesVersions;
