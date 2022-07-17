import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class SchedulesUnits extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ precision: 1, unique: true })
  day_of_week: number;

  @Column()
  length: number;
}

export default SchedulesUnits;
