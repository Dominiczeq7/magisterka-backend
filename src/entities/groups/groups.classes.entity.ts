import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import StructuresStructures from '../structures/structures.structures.entity';
import UsersStudents from '../users/users.students.entity';
import GroupsGroups from './groups.groups.entity';

@Entity()
export class GroupsClasses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 4 })
  start_year: number;

  @Column({ precision: 4 })
  end_year: number;

  @OneToMany((type) => GroupsGroups, (entity) => entity.class, {
    nullable: true,
  } as RelationOptions)
  groups: GroupsGroups[];

  @ManyToOne((type) => StructuresStructures, (entity) => entity.class, {
    nullable: true,
  } as RelationOptions)
  structure: StructuresStructures;

  @OneToMany((type) => UsersStudents, (entity) => entity.class, {
    nullable: false,
  } as RelationOptions)
  students: UsersStudents[];
}

export default GroupsClasses;
