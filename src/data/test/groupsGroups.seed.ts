import GroupsClasses from 'src/entities/groups/groups.classes.entity';
import GroupsGroups from 'src/entities/groups/groups.groups.entity';
import StructuresStructures from 'src/entities/structures/structures.structures.entity';
import { findInObjArray } from 'src/utils/exploring';

export const groupsGroupsSeedFun = async (): Promise<
  Partial<GroupsGroups>[]
> => {
  const classes = await GroupsClasses.find({
    relations: ['structure'],
  });
  const structures = await StructuresStructures.find();

  return [
    {
      name: 'Informatyka L1',
      class: findInObjArray(
        classes,
        findInObjArray(structures, 'Informatyka'),
        'structure',
      ),
    },
    {
      name: 'Informatyka L2',
      class: findInObjArray(
        classes,
        findInObjArray(structures, 'Informatyka'),
        'structure',
      ),
    },
    {
      name: 'Informatyka stosowana L1',
      class: findInObjArray(
        classes,
        findInObjArray(structures, 'Informatyka stosowana'),
        'structure',
      ),
    },
    {
      name: 'Informatyka stosowana L2',
      class: findInObjArray(
        classes,
        findInObjArray(structures, 'Informatyka stosowana'),
        'structure',
      ),
    },
  ];
};

export default groupsGroupsSeedFun;
