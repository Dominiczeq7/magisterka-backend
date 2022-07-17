import UsersUsers from 'src/entities/users/users.users.entity';
import { getRandomFromArray } from 'src/utils/exploring';
import UsersTeachers from 'src/entities/users/users.teachers.entity';
import { getRandomInt } from 'src/utils/generating';

export const usersTeachersGenSeedFun = async (
  users: UsersUsers[],
): Promise<Partial<UsersTeachers>[]> => {
  const titles = ['dr', 'mgr', 'dr hab.', 'prof.'];
  const positions = ['kierownik', 'adiunkt', 'asystent'];
  let teachers: Partial<UsersTeachers>[] = [];

  for (let i = 0; i < users.length; i++) {
    const teacher: Partial<UsersTeachers> = {
      title: getRandomFromArray(titles),
      user: users[i],
      position: getRandomInt(0, 10) === 0 ? getRandomFromArray(positions) : '',
    };
    teachers.push(teacher);
  }

  return teachers;
};

export default usersTeachersGenSeedFun;
