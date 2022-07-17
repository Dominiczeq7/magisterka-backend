import StructuresAddresses from 'src/entities/structures/structures.addresses.entity';
import StructuresStructures from 'src/entities/structures/structures.structures.entity';
import { findInObjArray } from 'src/utils/exploring';
import { updateInObjArray } from 'src/utils/conversion';
import StructuresLevels from 'src/entities/structures/structures.levels.entity';

export const structuresStructuresSeedFun = async (): Promise<
  Partial<StructuresStructures>[]
> => {
  const levels = await StructuresLevels.find();
  const addresses = await StructuresAddresses.find();

  let structures = [
    {
      name: 'Budynek',
      description: 'główny',
      parent_structure: undefined,
      level: findInObjArray(levels, 'budynek'),
      address: findInObjArray(addresses, 'Słoneczna 1A'),
    },
    {
      name: 'Budynek2',
      description: 'nowy',
      parent_structure: undefined,
      level: findInObjArray(levels, 'budynek'),
      address: findInObjArray(addresses, 'Słoneczna 1B'),
    },
    {
      name: 'Matematyki i informatyki',
      description: '',
      parent_structure: undefined,
      level: findInObjArray(levels, 'wydział'),
      address: undefined,
    },
    {
      name: 'Informatyka',
      description: '',
      parent_structure: undefined,
      level: findInObjArray(levels, 'kierunek'),
      address: undefined,
    },

    {
      name: 'Informatyka stosowana',
      description: '',
      parent_structure: undefined,
      level: findInObjArray(levels, 'kierunek'),
      address: undefined,
    },
  ];

  return structures;
};

export const structuresStructuresSeedFunUpdate = (structures: any[]) => {
  structures = updateInObjArray(
    structures,
    'name',
    'Matematyki i informatyki',
    'parent_structure',
    findInObjArray(structures, 'Budynek'),
  );
  structures = updateInObjArray(
    structures,
    'name',
    'Informatyka',
    'parent_structure',
    findInObjArray(structures, 'Matematyki i informatyki'),
  );
  structures = updateInObjArray(
    structures,
    'name',
    'Informatyka stosowana',
    'parent_structure',
    findInObjArray(structures, 'Matematyki i informatyki'),
  );

  return structures;
};

export default structuresStructuresSeedFun;
