import ClassroomsClassrooms from 'src/entities/classrooms/classrooms.classrooms.entity';
import ClassroomsEquipment from 'src/entities/classrooms/classrooms.equipments.entity';
import SetClassroomsEquipment from 'src/entities/classrooms/set.classrooms.equipment.entity';
import { findInObjArray } from 'src/utils/exploring';
import { getRandomInt } from 'src/utils/generating';

export const setClassroomsEquipmentSeedFun = async (): Promise<
  Partial<SetClassroomsEquipment>[]
> => {
  const classrooms = await ClassroomsClassrooms.find();
  const equipments = await ClassroomsEquipment.find();

  const sets = [];

  classrooms.forEach((classroom) => {
    const deskQuantity = getRandomInt(10, 30);
    const deskSet = {
      classroom: classroom,
      equipment: findInObjArray(equipments, 'ławka'),
      quantity: deskQuantity,
    };

    sets.push(deskSet);

    const randomBoardName =
      getRandomInt(0, 3) !== 0 ? 'tablica' : 'tablica na pisaki';
    const boardSet = {
      classroom: classroom,
      equipment: findInObjArray(equipments, randomBoardName),
      quantity: 1,
    };

    sets.push(boardSet);

    const withComputers = getRandomInt(0, 5) !== 0;
    if (withComputers) {
      const allComputers = findInObjArray(
        equipments,
        'komputer',
        'name',
        false,
      );
      const basicComputerName =
        getRandomInt(0, 4) !== 0 ? 'podstawowy' : 'z Mathematicą';
      const computerSet = {
        classroom: classroom,
        equipment: findInObjArray(
          allComputers,
          basicComputerName,
          'description',
        ),
        quantity: deskQuantity - getRandomInt(0, 5),
      };

      sets.push(computerSet);
    }

    const withProjector = getRandomInt(0, 2) !== 0;
    if (withProjector) {
      const projectorSet = {
        classroom: classroom,
        equipment: findInObjArray(equipments, 'rzutnik'),
        quantity: 1,
      };

      sets.push(projectorSet);
    }

    const withInteractiveBoard = getRandomInt(0, 10) === 0;
    if (withInteractiveBoard) {
      const interactiveBoardSet = {
        classroom: classroom,
        equipment: findInObjArray(equipments, 'tablica interaktywna'),
        quantity: 1,
      };

      sets.push(interactiveBoardSet);
    }
  });

  return sets;
};

export default setClassroomsEquipmentSeedFun;
