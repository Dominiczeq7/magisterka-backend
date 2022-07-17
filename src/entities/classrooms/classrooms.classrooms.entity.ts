import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
  ManyToOne,
} from 'typeorm';
import ImportancesClasses from '../importances/importances.classes.entity';
import SchedulesSchedules from '../schedules/schedules.schedules.entity';
import StructuresStructures from '../structures/structures.structures.entity';
import { SetClassroomsEquipment } from './set.classrooms.equipment.entity';

@Entity()
export class ClassroomsClassrooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  number: string;

  @Column({ precision: 2 })
  floor: number;

  @ManyToOne((type) => StructuresStructures, (entity) => entity.classroom, {
    nullable: false,
  } as RelationOptions)
  structure: StructuresStructures;

  @OneToMany((type) => SetClassroomsEquipment, (entity) => entity.classroom, {
    nullable: false,
  } as RelationOptions)
  classroom_equipment: SetClassroomsEquipment[];

  @OneToMany((type) => SchedulesSchedules, (entity) => entity.classroom, {
    nullable: true,
  } as RelationOptions)
  schedule: SchedulesSchedules[];

  @OneToMany((type) => ImportancesClasses, (entity) => entity.classroom)
  importance_class: ImportancesClasses[];
}

export default ClassroomsClassrooms;
