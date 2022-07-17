import UsersPermissions from 'src/entities/users/users.permissions.entity';

export const usersPermissionsSeed: Partial<UsersPermissions>[] = [
  {
    name: 'brak',
  },
  {
    name: 'podstawowe',
  },
  {
    name: 'planista',
  },
  {
    name: 'administrator',
  },
];

export default usersPermissionsSeed;
