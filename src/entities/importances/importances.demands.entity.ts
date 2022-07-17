import ActivitiesActivities from '../../entities/activities/activities.activities.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import ImportancesClasses from './importances.classes.entity';
import ImportancesEquipments from './importances.equipments.entity';

@Entity()
export class ImportancesDemands extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 1 })
  remote_rating: Number;

  @OneToMany((type) => ActivitiesActivities, (entity) => entity.demand, {
    nullable: true,
  } as RelationOptions)
  activity: ActivitiesActivities[];

  @OneToMany((type) => ImportancesEquipments, (entity) => entity.demand, {
    nullable: true,
  } as RelationOptions)
  importance_equipment: ImportancesEquipments[];

  @OneToMany((type) => ImportancesClasses, (entity) => entity.demand, {
    nullable: true,
  } as RelationOptions)
  importances_classes: ImportancesClasses[];
}

export default ImportancesDemands;
