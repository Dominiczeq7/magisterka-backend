import UsersPermissions from 'src/entities/users/users.permissions.entity';
import UsersStatuses from 'src/entities/users/users.statuses.entity';
import UsersUsers from 'src/entities/users/users.users.entity';
import * as faker from 'faker/locale/pl';
import { findInObjArray } from 'src/utils/exploring';

export const usersUsersGenSeedFun = async (
  quantity: number,
): Promise<Partial<UsersUsers>[]> => {
  const permissions = await UsersPermissions.find();
  const statuses = await UsersStatuses.find();
  let users: Partial<UsersUsers>[] = [];

  for (let i = 0; i < quantity; i++) {
    const name = faker.name.firstName();
    const surname = faker.name.lastName();
    let email = '';
    do {
      email = faker.internet.email(name, surname);
    } while (
      users.some(function (el) {
        return el.email === email;
      })
    );

    const user: Partial<UsersUsers> = {
      name: name,
      surname: surname,
      email: email,
      password: faker.internet.password(6, true),
      permission: findInObjArray(permissions, 'podstawowe'),
      status: findInObjArray(statuses, 'aktywny'),
    };
    users.push(user);
  }

  return users;
};

export default usersUsersGenSeedFun;
