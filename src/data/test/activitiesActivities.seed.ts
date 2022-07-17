import ActivitiesActivities from 'src/entities/activities/activities.activities.entity';
import ActivitiesSubjects from 'src/entities/activities/activities.subjects.entity';
import ActivitiesTypes from 'src/entities/activities/activities.types.entity';
import GroupsGroups from 'src/entities/groups/groups.groups.entity';
import ImportancesDemands from 'src/entities/importances/importances.demands.entity';
import UsersTeachers from 'src/entities/users/users.teachers.entity';
import { findInObjArray } from 'src/utils/exploring';

export const activitiesActivitiesSeedFun = async (): Promise<
  Partial<ActivitiesActivities>[]
> => {
  const teachers = await UsersTeachers.find();
  const subjects = await ActivitiesSubjects.find();
  const types = await ActivitiesTypes.find();
  const groups = await GroupsGroups.find();
  const demands = await ImportancesDemands.find();

  return [
    {
      teacher: teachers[0],
      subject: findInObjArray(subjects, 'Komputerowa grafika użytkowa'),
      activityType: findInObjArray(types, 'ćwiczenia'),
      group: findInObjArray(groups, 'Informatyka L1'),
      demand: null,
      numberOfHours: 30,
    },
    {
      teacher: teachers[0],
      subject: findInObjArray(subjects, 'Ochrona własności intelektualnej'),
      activityType: findInObjArray(types, 'ćwiczenia'),
      group: findInObjArray(groups, 'Informatyka L1'),
      demand: null,
      numberOfHours: 30,
    },
    {
      teacher: teachers[1],
      subject: findInObjArray(
        subjects,
        'Podstawy przedsiębiorczości dla informatyków',
      ),
      activityType: findInObjArray(types, 'ćwiczenia'),
      group: findInObjArray(groups, 'Informatyka L1'),
      demand: null,
      numberOfHours: 30,
    },
    {
      teacher: teachers[1],
      subject: findInObjArray(subjects, 'Podstawy programowania'),
      activityType: findInObjArray(types, 'ćwiczenia'),
      group: findInObjArray(groups, 'Informatyka L1'),
      demand: null,
      numberOfHours: 30,
    },
    {
      teacher: teachers[1],
      subject: findInObjArray(subjects, 'Teoretyczne podstawy informatyki'),
      activityType: findInObjArray(types, 'ćwiczenia'),
      group: findInObjArray(groups, 'Informatyka L1'),
      demand: null,
      numberOfHours: 30,
    },
  ];
};

export default activitiesActivitiesSeedFun;
