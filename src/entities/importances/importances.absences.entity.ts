import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import UsersTeachers from '../users/users.teachers.entity';

@Entity()
export class ImportancesAbsences extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  hour_from: String;

  @Column({ length: 5 })
  hour_to: String;

  @Column({ precision: 1 })
  day_of_the_week: Number;

  @ManyToOne((type) => UsersTeachers, (entity) => entity.importance_absence)
  teacher: UsersTeachers;

  @Column({ precision: 1 })
  rating: Number;
}

export default ImportancesAbsences;
