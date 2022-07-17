import UsersUsers from 'src/entities/users/users.users.entity';
import UsersStudents from 'src/entities/users/users.students.entity';
import GroupsClasses from 'src/entities/groups/groups.classes.entity';
import { findInObjArray, getRandomFromArray } from 'src/utils/exploring';
import GroupsGroups from 'src/entities/groups/groups.groups.entity';

export const usersStudentsGenSeedFun = async (
  users: UsersUsers[],
): Promise<Partial<UsersStudents>[]> => {
  const classes = await GroupsClasses.find();
  const groups = await GroupsGroups.find({
    relations: ['class'],
  });

  const albumNumber = 100000;
  let students: Partial<UsersStudents>[] = [];

  for (let i = 0; i < users.length; i++) {
    const studentClass = getRandomFromArray(classes);
    const studentGroup = findInObjArray(groups, studentClass, 'class');
    const student: Partial<UsersStudents> = {
      album: albumNumber + i,
      user: users[i],
      class: getRandomFromArray(classes),
      groups: [studentGroup],
    };
    students.push(student);
  }

  return students;
};

export default usersStudentsGenSeedFun;
