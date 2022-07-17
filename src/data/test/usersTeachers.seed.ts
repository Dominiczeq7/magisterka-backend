import StructuresStructures from 'src/entities/structures/structures.structures.entity';
import UsersTeachers from 'src/entities/users/users.teachers.entity';
import UsersUsers from 'src/entities/users/users.users.entity';
import { findInObjArray } from 'src/utils/exploring';

export const usersTeachersSeedFun = async (): Promise<
  Partial<UsersTeachers>[]
> => {
  const users = await UsersUsers.find();
  const structures = await StructuresStructures.find();

  return [
    {
      title: 'dr',
      position: 'rektor',
      user: findInObjArray(users, 'ryba@poczta.pl', 'email'),
      structures: findInObjArray(
        structures,
        'Matematyki i informatyki',
        'name',
        false,
      ),
    },
    {
      title: 'mgr inż.',
      position: 'kierownik',
      user: findInObjArray(users, 'forma@poczta.pl', 'email'),
      structures: findInObjArray(
        structures,
        'Matematyki i informatyki',
        'name',
        false,
      ),
    },
  ];
};

export default usersTeachersSeedFun;
