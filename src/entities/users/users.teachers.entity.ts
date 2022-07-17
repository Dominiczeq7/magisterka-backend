import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import ActivitiesActivities from '../activities/activities.activities.entity';
import ImportancesAbsences from '../importances/importances.absences.entity';
import StructuresStructures from '../structures/structures.structures.entity';
import UsersUsers from './users.users.entity';

@Entity()
export class UsersTeachers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, nullable: true })
  title: string | null;

  @Column({ length: 45, nullable: true })
  position: string | null;

  @ManyToOne((type) => UsersUsers, (entity) => entity.teacher, {
    nullable: false,
    onDelete: 'CASCADE',
  } as RelationOptions)
  user: UsersUsers;

  @OneToMany((type) => ActivitiesActivities, (entity) => entity.teacher, {
    nullable: true,
  } as RelationOptions)
  activity: ActivitiesActivities[];

  @ManyToMany((type) => StructuresStructures, (entity) => entity.teachers, {
    onDelete: 'CASCADE',
  } as RelationOptions)
  structures: StructuresStructures[];

  @OneToMany((type) => ImportancesAbsences, (entity) => entity.teacher)
  importance_absence: ImportancesAbsences[];
}

export default UsersTeachers;
