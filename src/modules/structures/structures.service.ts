import { Injectable } from '@nestjs/common';
import StructuresStructures from '../../entities/structures/structures.structures.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class StructuresService {
  async getStructures(): Promise<StructuresStructures[]> {
    return await StructuresStructures.find({
      relations: ['level', 'address', 'parent_structure'],
    });
  }

  async getStructure(id: number): Promise<StructuresStructures> {
    return await StructuresStructures.findOne(id, {
      relations: ['level', 'address', 'parent_structure'],
    });
  }

  async addStructure(
    structure: StructuresStructures,
  ): Promise<StructuresStructures> {
    const id = (await StructuresStructures.save(structure)).id;
    const new_structure = await this.getStructure(id);
    return await new_structure;
  }

  async updateStructure(
    id: number,
    fields: Partial<StructuresStructures>,
  ): Promise<StructuresStructures> {
    const structure = await StructuresStructures.findOne(id);

    const structure_to_update = updateFromPartial(structure, fields);
    await StructuresStructures.save(structure_to_update);
    const updated_structure = await this.getStructure(id);

    return await updated_structure;
  }

  async removeStructure(id: number): Promise<boolean> {
    const is_removed = (await StructuresStructures.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
