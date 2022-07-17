import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationOptions,
} from 'typeorm';
import ClassroomsClassrooms from './classrooms.classrooms.entity';
import ClassroomsEquipment from './classrooms.equipments.entity';

@Entity()
export class SetClassroomsEquipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => ClassroomsClassrooms,
    (entity) => entity.classroom_equipment,
    {
      nullable: false,
    } as RelationOptions,
  )
  classroom: ClassroomsClassrooms;

  @ManyToOne(
    (type) => ClassroomsEquipment,
    (entity) => entity.classroom_equipment,
    {
      nullable: false,
    } as RelationOptions,
  )
  equipment: ClassroomsEquipment;

  @Column()
  quantity: number;
}

export default SetClassroomsEquipment;
