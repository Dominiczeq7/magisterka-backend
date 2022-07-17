import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationOptions,
} from 'typeorm';
import ClassroomsEquipment from '../classrooms/classrooms.equipments.entity';
import ImportancesDemands from './importances.demands.entity';

@Entity()
export class ImportancesEquipments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 1 })
  rating: Number;

  @ManyToOne(
    (type) => ClassroomsEquipment,
    (entity) => entity.importance_equipment,
    {
      nullable: false,
    } as RelationOptions,
  )
  equipment: ClassroomsEquipment;

  @Column()
  quantity: Number;

  @ManyToOne(
    (type) => ImportancesDemands,
    (entity) => entity.importance_equipment,
    {
      nullable: true,
    } as RelationOptions,
  )
  demand: ImportancesDemands;
}

export default ImportancesEquipments;
