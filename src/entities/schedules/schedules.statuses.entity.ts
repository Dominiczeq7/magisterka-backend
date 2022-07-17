import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import SchedulesVersions from './schedules.versions.entity';

@Entity()
export class SchedulesStatuses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany((type) => SchedulesVersions, (entity) => entity.status)
  version: SchedulesVersions[];
}

export default SchedulesStatuses;
