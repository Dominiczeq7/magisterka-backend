import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import StructuresStructures from './structures.structures.entity';

@Entity()
export class StructuresLevels extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @Column()
  hierarchy: number;

  @OneToMany((type) => StructuresStructures, (entity) => entity.level)
  structure: StructuresStructures[];
}

export default StructuresLevels;
