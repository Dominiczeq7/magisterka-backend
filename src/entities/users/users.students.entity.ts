import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import GroupsClasses from '../groups/groups.classes.entity';
import GroupsGroups from '../groups/groups.groups.entity';
import UsersUsers from './users.users.entity';

@Entity()
export class UsersStudents extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 10, unique: true })
  album: number;

  @ManyToMany((type) => GroupsGroups, (entity) => entity.students)
  groups: GroupsGroups[];

  @ManyToOne((type) => UsersUsers, (entity) => entity.student, {
    nullable: false,
    onDelete: 'CASCADE',
  } as RelationOptions)
  user: UsersUsers;

  @ManyToOne((type) => GroupsClasses, (entity) => entity.students, {
    nullable: false,
  } as RelationOptions)
  class: GroupsClasses;
}

export default UsersStudents;
