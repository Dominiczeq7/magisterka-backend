import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import UsersUsers from './users.users.entity';

@Entity()
export class UsersStatuses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany((type) => UsersUsers, (entity) => entity.permission, {
    nullable: false,
  } as RelationOptions)
  users: UsersUsers[];
}

export default UsersStatuses;
