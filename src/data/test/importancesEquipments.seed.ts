import ImportancesDemands from 'src/entities/importances/importances.demands.entity';
import ImportancesEquipments from 'src/entities/importances/importances.equipments.entity';
import { findInObjArray } from 'src/utils/exploring';
import ClassroomsEquipment from 'src/entities/classrooms/classrooms.equipments.entity';

export const importancesEquipmentsSeedFun = async (): Promise<
  Partial<ImportancesEquipments>[]
> => {
  const equipments = await ClassroomsEquipment.find();
  const demands = await ImportancesDemands.find();

  const allComputers = findInObjArray(equipments, 'komputer', 'name', false);

  return [
    {
      rating: 5,
      quantity: 15,
      demand: demands[0],
      equipment: findInObjArray(allComputers, 'z Mathematicą', 'description'),
    },
    {
      rating: 5,
      quantity: 20,
      demand: demands[1],
      equipment: findInObjArray(allComputers, 'podstawowy', 'description'),
    },
    {
      rating: 5,
      quantity: 1,
      demand: demands[1],
      equipment: findInObjArray(equipments, 'rzutnik'),
    },
    {
      rating: 5,
      quantity: 1,
      demand: demands[1],
      equipment: findInObjArray(equipments, 'tablica'),
    },
    {
      rating: 5,
      quantity: 20,
      demand: demands[2],
      equipment: findInObjArray(equipments, 'ławka'),
    },
  ];
};

export default importancesEquipmentsSeedFun;
