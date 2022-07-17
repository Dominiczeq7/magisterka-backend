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
export class StructuresAddresses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, unique: true })
  name: string;

  @OneToMany((type) => StructuresStructures, (entity) => entity.address, {
    nullable: true,
  } as RelationOptions)
  structure: StructuresStructures[];
}

export default StructuresAddresses;
