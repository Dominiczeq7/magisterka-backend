import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import ImportancesEquipments from '../importances/importances.equipments.entity';
import { SetClassroomsEquipment } from './set.classrooms.equipment.entity';

@Entity()
export class ClassroomsEquipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string | null;

  @OneToMany((type) => SetClassroomsEquipment, (entity) => entity.equipment, {
    nullable: false,
  } as RelationOptions)
  classroom_equipment: SetClassroomsEquipment[];

  @OneToMany((type) => ImportancesEquipments, (entity) => entity.equipment, {
    nullable: false,
  } as RelationOptions)
  importance_equipment: ImportancesEquipments[];
}

export default ClassroomsEquipment;
