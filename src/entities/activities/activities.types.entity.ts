import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import ActivitiesActivities from './activities.activities.entity';

@Entity()
export class ActivitiesTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany((type) => ActivitiesActivities, (entity) => entity.activityType, {
    nullable: false,
  } as RelationOptions)
  activity: ActivitiesActivities[];
}

export default ActivitiesTypes;
