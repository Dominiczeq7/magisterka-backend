import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import UsersPermissions from './users.permissions.entity';
import UsersStatuses from './users.statuses.entity';
import UsersStudents from './users.students.entity';
import UsersTeachers from './users.teachers.entity';

@Entity()
export class UsersUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45 })
  surname: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 45, select: false })
  password: string;

  @ManyToOne((type) => UsersPermissions, (entity) => entity.user, {
    nullable: false,
  } as RelationOptions)
  permission: UsersPermissions;

  @OneToMany((type) => UsersStudents, (entity) => entity.user, {
    nullable: false,
  } as RelationOptions)
  student: UsersStudents;

  @OneToMany((type) => UsersTeachers, (entity) => entity.user, {
    nullable: false,
    onDelete: 'CASCADE',
  } as RelationOptions)
  teacher: UsersTeachers;

  @ManyToOne((type) => UsersStatuses, (entity) => entity.users, {
    nullable: false,
  } as RelationOptions)
  status: UsersStatuses;
}

export default UsersUsers;
