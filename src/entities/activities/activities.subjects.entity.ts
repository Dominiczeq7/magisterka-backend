import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import ActivitiesActivities from './activities.activities.entity';

@Entity()
export class ActivitiesSubjects extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany((type) => ActivitiesActivities, (entity) => entity.subject, {
    nullable: false,
  } as RelationOptions)
  activity: ActivitiesActivities[];
}

export default ActivitiesSubjects;
