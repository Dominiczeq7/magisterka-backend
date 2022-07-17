import { type } from 'os';
import ClassroomsClassrooms from '../../entities/classrooms/classrooms.classrooms.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationOptions,
} from 'typeorm';
import ImportancesDemands from './importances.demands.entity';

@Entity()
export class ImportancesClasses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 1 })
  rating: Number;

  @ManyToOne(
    (type) => ImportancesDemands,
    (entity) => entity.importances_classes,
    {
      nullable: false,
    } as RelationOptions,
  )
  demand: ImportancesDemands;

  @ManyToOne(
    (type) => ClassroomsClassrooms,
    (entity) => entity.importance_class,
    {
      nullable: false,
    } as RelationOptions,
  )
  classroom: ClassroomsClassrooms;
}

export default ImportancesClasses;
