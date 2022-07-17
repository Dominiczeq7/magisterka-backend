import GroupsClasses from 'src/entities/groups/groups.classes.entity';
import StructuresStructures from 'src/entities/structures/structures.structures.entity';
import { findInObjArray } from 'src/utils/exploring';

export const groupsClassesSeedFun = async (): Promise<
  Partial<GroupsClasses>[]
> => {
  const structures = await StructuresStructures.find();

  return [
    {
      start_year: 2019,
      end_year: 2021,
      structure: findInObjArray(structures, 'Informatyka'),
      students: [],
    },
    {
      start_year: 2019,
      end_year: 2021,
      structure: findInObjArray(structures, 'Informatyka stosowana'),
      students: [],
    },
  ];
};

export default groupsClassesSeedFun;
