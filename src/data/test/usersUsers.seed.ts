import UsersPermissions from 'src/entities/users/users.permissions.entity';
import UsersStatuses from 'src/entities/users/users.statuses.entity';
import UsersUsers from 'src/entities/users/users.users.entity';
import { findInObjArray } from 'src/utils/exploring';

export const usersUsersSeedFun = async (): Promise<Partial<UsersUsers>[]> => {
  const statuses = await UsersStatuses.find();
  const permissions = await UsersPermissions.find();

  return [
    {
      name: 'Olaf',
      surname: 'Dobosz',
      email: 'ryba@poczta.pl',
      password: 'ryba@poczta.pl',
      permission: findInObjArray(permissions, 'administrator'),
      status: findInObjArray(statuses, 'aktywny'),
    },
    {
      name: 'Małgorzata',
      surname: 'Foremniak',
      email: 'forma@poczta.pl',
      password: 'forma@poczta.pl',
      permission: findInObjArray(permissions, 'planista'),
      status: findInObjArray(statuses, 'aktywny'),
    },
    {
      name: 'Adam',
      surname: 'Cebularz',
      email: 'cebula@poczta.pl',
      password: 'cebula@poczta.pl',
      permission: findInObjArray(permissions, 'podstawowe'),
      status: findInObjArray(statuses, 'aktywny'),
    },
    {
      name: 'Radosław',
      surname: 'Radny',
      email: 'radny@poczta.pl',
      password: 'radny@poczta.pl',
      permission: findInObjArray(permissions, 'brak'),
      status: findInObjArray(statuses, 'aktywny'),
    },
    {
      name: 'Mieczysław',
      surname: 'Łoś',
      email: 'los@poczta.pl',
      password: 'los@poczta.pl',
      permission: findInObjArray(permissions, 'podstawowe'),
      status: findInObjArray(statuses, 'nieaktywny'),
    },
  ];
};

export default usersUsersSeedFun;
