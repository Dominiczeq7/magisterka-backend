import ClassroomsClassrooms from '../../entities/classrooms/classrooms.classrooms.entity';
import GroupsClasses from '../../entities/groups/groups.classes.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationOptions,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import UsersTeachers from '../users/users.teachers.entity';
import StructuresAddresses from './structures.addresses.entity';
import StructuresLevels from './structures.levels.entity';

@Entity()
export class StructuresStructures extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string | null;

  @ManyToOne((type) => StructuresStructures, (entity) => entity.structure, {
    nullable: true,
    onDelete: 'CASCADE',
  } as RelationOptions)
  parent_structure: StructuresStructures;

  @OneToMany(
    (type) => StructuresStructures,
    (entity) => entity.parent_structure,
    {
      nullable: true,
    } as RelationOptions,
  )
  structure: StructuresStructures[];

  @ManyToOne((type) => StructuresLevels, (entity) => entity.structure, {
    nullable: false,
  } as RelationOptions)
  level: StructuresLevels;

  @ManyToOne((type) => StructuresAddresses, (entity) => entity.structure, {
    nullable: true,
    onDelete: 'CASCADE',
  } as RelationOptions)
  address: StructuresAddresses;

  @ManyToMany((type) => UsersTeachers, (entity) => entity.structures)
  @JoinTable({
    name: 'set_teachers_structures',
    joinColumn: {
      name: 'structureId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacherId',
      referencedColumnName: 'id',
    },
  })
  teachers: UsersTeachers[];

  @OneToMany((type) => ClassroomsClassrooms, (entity) => entity.structure, {
    nullable: true,
    onDelete: 'CASCADE',
  } as RelationOptions)
  classroom: ClassroomsClassrooms[];

  @OneToMany((type) => GroupsClasses, (entity) => entity.structure, {
    nullable: true,
    onDelete: 'CASCADE',
  } as RelationOptions)
  class: GroupsClasses[];
}

export default StructuresStructures;
