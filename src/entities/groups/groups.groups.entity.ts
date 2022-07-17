import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import ActivitiesActivities from '../activities/activities.activities.entity';
import UsersStudents from '../users/users.students.entity';
import GroupsClasses from './groups.classes.entity';

@Entity()
export class GroupsGroups extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @ManyToOne((type) => GroupsClasses, (entity) => entity.groups, {
    nullable: true,
  } as RelationOptions)
  class: GroupsClasses;

  @ManyToMany((type) => UsersStudents, (entity) => entity.groups)
  @JoinTable({
    name: 'set_groups_students',
    joinColumn: {
      name: 'groupId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'studentId',
      referencedColumnName: 'id',
    },
  })
  students: UsersStudents[];

  @OneToMany((type) => ActivitiesActivities, (entity) => entity.group, {
    nullable: false,
  } as RelationOptions)
  activity: ActivitiesActivities[];
}

export default GroupsGroups;
