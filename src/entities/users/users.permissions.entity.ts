import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import UsersUsers from './users.users.entity';

@Entity()
export class UsersPermissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany((type) => UsersUsers, (entity) => entity.permission, {
    nullable: false,
  } as RelationOptions)
  user: UsersUsers[];
}

export default UsersPermissions;
