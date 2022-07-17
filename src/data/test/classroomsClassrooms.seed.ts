import ClassroomsClassrooms from 'src/entities/classrooms/classrooms.classrooms.entity';
import StructuresStructures from 'src/entities/structures/structures.structures.entity';
import { findInObjArray } from 'src/utils/exploring';

export const classroomsClassroomsSeedFun = async (): Promise<
  Partial<ClassroomsClassrooms>[]
> => {
  const structures = await StructuresStructures.find();
  const structureMII = findInObjArray(structures, 'Matematyki i informatyki');

  return [
    {
      number: '401A',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '401B',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '402',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '403',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '404',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '405',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '406',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '407',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '408',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '409',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '410',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '411',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '412',
      floor: 4,
      structure: structureMII,
    },
    {
      number: '413',
      floor: 4,
      structure: structureMII,
    },
  ];
};

export default classroomsClassroomsSeedFun;
