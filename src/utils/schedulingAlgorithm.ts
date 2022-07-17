import ActivitiesActivities from 'src/entities/activities/activities.activities.entity';
import ClassroomsClassrooms from 'src/entities/classrooms/classrooms.classrooms.entity';
import SchedulesSchedules from 'src/entities/schedules/schedules.schedules.entity';
import SchedulesSemesters from 'src/entities/schedules/schedules.semesters.entity';
import SchedulesStatuses from 'src/entities/schedules/schedules.statuses.entity';
import SchedulesVersions from 'src/entities/schedules/schedules.versions.entity';
import { findInObjArray } from './exploring';
import ImportancesAbsences from 'src/entities/importances/importances.absences.entity';
import GroupsClasses from 'src/entities/groups/groups.classes.entity';
import { getRepository, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import GroupsGroups from 'src/entities/groups/groups.groups.entity';
import ImportancesDemands from 'src/entities/importances/importances.demands.entity';
import UsersTeachers from 'src/entities/users/users.teachers.entity';
import SchedulesUnits from 'src/entities/schedules/schedules.units.entity';
import { addMinutes, weekDiff } from './conversion';

export async function schedulingAlgorithm(
  semester_id: number,
  version_id: number,
) {
  const selectedSemester = await SchedulesSemesters.findOne({
    where: {
      id: semester_id,
    },
  });
  const selectedVersion = await SchedulesVersions.findOne({
    where: {
      id: version_id,
    },
  });
  const schedules = await SchedulesSchedules.find({
    relations: ['activity', 'classroom'],
    where: {
      semester: selectedSemester,
      version: selectedVersion,
    },
  });

  const usedActivitiesIds = [
    ...new Set(schedules.map((schedule) => schedule.activity.id)),
  ];

  const actualYear = new Date().getFullYear();
  const actualClasses = await GroupsClasses.find({
    where: {
      start_year: LessThanOrEqual(actualYear),
      end_year: MoreThanOrEqual(actualYear),
    },
  });

  const actualGroups = await GroupsGroups.find({
    where: {
      class: In(actualClasses.map((actualClass) => actualClass.id)),
    },
  });

  const actualActivities = await ActivitiesActivities.find({
    where: {
      group: In(actualGroups.map((actualGroup) => actualGroup.id)),
    },
    relations: [
      'teacher',
      'teacher.importance_absence',
      'demand',
      'demand.importance_equipment',
      'demand.importances_classes',
      'group',
    ],
  });

  const unusedActivities = actualActivities.filter(
    (activity) => !usedActivitiesIds.includes(activity.id),
  );

  const activitiesWithDemands = unusedActivities.filter(
    (activity) => activity.demand !== null,
  );
  const activitiesWithoutDemands = unusedActivities.filter(
    (activity) => activity.demand === null,
  );

  const classrooms = await ClassroomsClassrooms.find({
    relations: ['classroom_equipment', 'classroom_equipment.equipment'],
  });

  const startHour = '8:00';
  const endHour = '18:00';

  const schedulesUnits = await SchedulesUnits.find();

  const weekQuantity = weekDiff(
    selectedSemester.date_from,
    selectedSemester.date_to,
  );

  const weekBlocks: {
    dayOfWeek: number;
    fromDate: Date;
    length: number;
    activityWantedIds: number[];
    activityImpossibleIds: number[];
    activityEligible: number[];
  }[] = [];
  schedulesUnits.forEach((unitDay) => {
    let i = 0;
    let actualDate = new Date();
    actualDate.setHours(startHour.split(':')[0] as unknown as number);
    actualDate.setMinutes(startHour.split(':')[1] as unknown as number);
    actualDate.setSeconds(0);

    let endDate = new Date();
    endDate.setHours(endHour.split(':')[0] as unknown as number);
    endDate.setMinutes(endHour.split(':')[1] as unknown as number);
    endDate.setSeconds(0);
    while (actualDate < endDate) {
      weekBlocks.push({
        dayOfWeek: unitDay.day_of_week,
        fromDate: actualDate,
        length: unitDay.length,
        activityWantedIds: [],
        activityImpossibleIds: [],
        activityEligible: [],
      });

      actualDate = addMinutes(actualDate, unitDay.length);
    }
  });

  const classroomsBlocks = classrooms.map((classroom) => {
    return {
      id: classroom.id,
      weekBlocks: weekBlocks,
    };
  });

  activitiesWithDemands.forEach((activity) => {
    const absences = activity.teacher.importance_absence;
    classroomsBlocks.forEach((classroomBlock) => {
      const isClassWanted =
        classroomBlock.id === activity.demand.importances_classes[0]?.id;
      const impClassroomsEquipments = activity.demand.importance_equipment;
      let isEligible: undefined | boolean = undefined;
      if (impClassroomsEquipments.length > 0) {
        const classroom = classrooms.find(
          (classroom) => classroom.id === classroomBlock.id,
        );

        isEligible = true;
        for (let i = 0; i < impClassroomsEquipments.length; i++) {
          const impEquipmentSet = impClassroomsEquipments[i];

          const impEquipmentId = impEquipmentSet.equipment.id;
          const equipmentSet = classroom.classroom_equipment.find(
            (equipmentSet) => equipmentSet.equipment.id === impEquipmentId,
          );
          if (impEquipmentSet.quantity < equipmentSet.quantity) {
            isEligible = false;
            break;
          }
        }
      }

      classroomBlock.weekBlocks.forEach((weekBlock) => {
        const absencesAtDay = findInObjArray(
          absences,
          weekBlock.dayOfWeek,
          'day_of_the_week',
          false,
        );
        let isValidDate: undefined | boolean = undefined;
        if (absencesAtDay !== []) {
          isValidDate = true;
          for (let j = 0; j < absencesAtDay.length; j++) {
            const absence = absencesAtDay[j];

            let absenceStartDate = new Date();
            absenceStartDate.setHours(
              absence.hour_from.split(':')[0] as unknown as number,
            );
            absenceStartDate.setMinutes(
              absence.hour_from.split(':')[1] as unknown as number,
            );
            absenceStartDate.setSeconds(0);

            let absenceEndDate = new Date();
            absenceEndDate.setHours(
              absence.hour_to.split(':')[0] as unknown as number,
            );
            absenceEndDate.setMinutes(
              absence.hour_to.split(':')[1] as unknown as number,
            );
            absenceEndDate.setSeconds(0);

            if (
              weekBlock.fromDate >= absenceStartDate &&
              weekBlock.fromDate < absenceEndDate
            ) {
              isValidDate = false;
              break;
            }
          }
        }
        if (isValidDate === false || isEligible === false) {
          weekBlock.activityImpossibleIds.push(activity.id);
        }

        if (isClassWanted) {
          weekBlock.activityWantedIds.push(activity.id);
        }
        if (isEligible === true) {
          weekBlock.activityEligible.push(activity.id);
        }
      });
    });
  });

  const availableInBlocks = weekBlocks.map((weekBlock) => {
    return {
      dayOfWeek: weekBlock.dayOfWeek,
      fromDate: weekBlock.fromDate,
      length: weekBlock.length,
      availableGroupsIds: actualGroups.map((group) => group.id),
      availableClassroomsIds: classrooms.map((classroom) => classroom.id),
      availableTeachersIds: [
        ...new Set(actualActivities.map((activity) => activity.teacher.id)),
      ],
    };
  });

  const generatedSchedules: {
    date_from: Date;
    duration: number;
    activity: number;
    version: number;
    classroom: number;
    semester: number;
  }[] = [];
  let reservedActivitiesIds: number[] = [];
  const shuffledGroupsIds = actualGroups
    .map((group) => group.id)
    .sort(() => Math.random() - 0.5);

  shuffledGroupsIds.forEach((groupId) => {
    const activitiesForGroup = unusedActivities
      .filter((activity) => activity.group.id === groupId)
      .sort(() => Math.random() - 0.5);

    let actualBlockNumber = 0;
    for (
      let activityIt = 0;
      activityIt < activitiesForGroup.length;
      activityIt++
    ) {
      let candidateClassroomId = classroomsBlocks[0].id;
      const activity = activitiesForGroup[activityIt];
      let matchingClassrooms = [];
      let bestMatchingClassroomId = null;

      const countOfActivityBlocks = Math.floor(
        (activity.numberOfHours * 60) /
          classroomsBlocks[0].weekBlocks[actualBlockNumber].length /
          weekQuantity,
      );

      let isActivityToSkip = false;
      for (
        let blockIt = actualBlockNumber;
        blockIt < actualBlockNumber + countOfActivityBlocks;
        blockIt++
      ) {
        if (
          !availableInBlocks[blockIt].availableGroupsIds.includes(
            activity.group.id,
          ) ||
          !availableInBlocks[blockIt].availableTeachersIds.includes(
            activity.teacher.id,
          )
        ) {
          isActivityToSkip = true;
          break;
        }
      }
      if (isActivityToSkip) {
        if (activityIt + 2 < activitiesForGroup.length) {
          activitiesForGroup.splice(activityIt + 2, 0, activity);
          continue;
        } else {
          activitiesForGroup.push(activity);
          continue;
        }
      }

      for (
        let classroomIt = 0;
        classroomIt < classroomsBlocks.length;
        classroomIt++
      ) {
        const classroom = classroomsBlocks[classroomIt];
        const weekBlocks = classroom.weekBlocks;

        let isClassroomToSkip = false;
        for (
          let blockIt = actualBlockNumber;
          blockIt < actualBlockNumber + countOfActivityBlocks;
          blockIt++
        ) {
          const weekBlock = weekBlocks[blockIt];
          if (
            weekBlock.activityImpossibleIds.includes(activity.id) ||
            !availableInBlocks[blockIt].availableClassroomsIds.includes(
              classroom.id,
            )
          ) {
            isClassroomToSkip = true;
            break;
          }
        }
        if (isClassroomToSkip) {
          continue;
        }

        if (
          weekBlocks[actualBlockNumber].activityWantedIds.includes(activity.id)
        ) {
          let isBlocksContinuity = true;
          for (
            let blockIt = actualBlockNumber;
            blockIt < actualBlockNumber + countOfActivityBlocks;
            blockIt++
          ) {
            const weekBlock = weekBlocks[blockIt];
            if (!weekBlock.activityWantedIds.includes(activity.id)) {
              isBlocksContinuity = false;
            }
          }

          if (isBlocksContinuity) {
            bestMatchingClassroomId = classroom.id;
            break;
          }
        }

        if (
          weekBlocks[actualBlockNumber].activityEligible.includes(activity.id)
        ) {
          matchingClassrooms.push(classroom.id);
        }
      }
      if (bestMatchingClassroomId) {
        candidateClassroomId = bestMatchingClassroomId;
      } else if (matchingClassrooms.length > 0) {
        candidateClassroomId = matchingClassrooms[0];
      }

      const generatedSchedule = {
        activity: activity.id,
        classroom: candidateClassroomId,
        date_from:
          classroomsBlocks[candidateClassroomId].weekBlocks[actualBlockNumber]
            .fromDate,
        duration:
          countOfActivityBlocks *
          classroomsBlocks[candidateClassroomId].weekBlocks[actualBlockNumber]
            .length,
        semester: semester_id,
        version: version_id,
      };
      generatedSchedules.push(generatedSchedule);

      reservedActivitiesIds.push(activity.id);

      for (
        let blockIt = actualBlockNumber;
        blockIt < actualBlockNumber + countOfActivityBlocks;
        blockIt++
      ) {
        const classroomIndex = availableInBlocks[
          blockIt
        ].availableClassroomsIds.indexOf(generatedSchedule.classroom);
        if (classroomIndex > -1) {
          availableInBlocks[blockIt].availableClassroomsIds.splice(
            classroomIndex,
            1,
          );
        }

        const teacherIndex = availableInBlocks[
          blockIt
        ].availableClassroomsIds.indexOf(activity.teacher.id);
        if (teacherIndex > -1) {
          availableInBlocks[blockIt].availableTeachersIds.splice(
            teacherIndex,
            1,
          );
        }

        const groupIndex = availableInBlocks[
          blockIt
        ].availableGroupsIds.indexOf(activity.group.id);
        if (groupIndex > -1) {
          availableInBlocks[blockIt].availableGroupsIds.splice(groupIndex, 1);
        }
      }

      actualBlockNumber += countOfActivityBlocks;
    }
  });

  return generatedSchedules;
