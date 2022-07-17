import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import usersUsersSeedFun from 'src/data/test/usersUsers.seed';
import classroomsEquipmentSeed from 'src/data/test/classroomsEquipments.seed';
import {
  structuresStructuresSeedFun,
  structuresStructuresSeedFunUpdate,
} from '../data/test/structuresStructures.seed';
import structuresAddressesSeed from 'src/data/test/structuresAddresses.seed';
import usersTeachersSeedFun from 'src/data/test/usersTeachers.seed';
import activitiesSubjectsSeed from 'src/data/test/activitiesSubjects.seed';
import activitiesTypesSeed from 'src/data/test/activitiesTypes.seed';
import classroomsClassroomsSeedFun from 'src/data/test/classroomsClassrooms.seed';
import groupsClassesSeedFun from 'src/data/test/groupsClasses.seed';
import { MRD_PATH } from 'src/utils/consts';
import { saveSeeds, setMigrationsRecordsData } from 'src/utils/saving';
import { getMigrationsRecordsData } from 'src/utils/exploring';
import { removeSeeds } from 'src/utils/removing';
import groupsGroupsSeedFun from 'src/data/test/groupsGroups.seed';
import activitiesActivitiesSeedFun from 'src/data/test/activitiesActivities.seed';
import schedulesSemestersSeed from 'src/data/test/schedulesSemesters.seed';
import schedulesVersionsSeedFun from 'src/data/test/schedulesVersions.seed';
import importancesDemandsSeedFun from 'src/data/test/importancesDemands.seed';
import importancesEquipmentsSeedFun from 'src/data/test/importancesEquipments.seed';

const MIGRATION_NAME = 'DATA_TEST';
export class DATATEST1630568454540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    var MRD = getMigrationsRecordsData();
    MRD[MIGRATION_NAME] = {};

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersUsers',
      await usersUsersSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ClassroomsEquipment',
      classroomsEquipmentSeed,
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'StructuresAddresses',
      structuresAddressesSeed,
    );

    const structures = await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'StructuresStructures',
      await structuresStructuresSeedFun(),
    );
    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'StructuresStructures',
      await structuresStructuresSeedFunUpdate(structures),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ActivitiesSubjects',
      activitiesSubjectsSeed,
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ActivitiesTypes',
      activitiesTypesSeed,
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ClassroomsClassrooms',
      await classroomsClassroomsSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'GroupsClasses',
      await groupsClassesSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'GroupsGroups',
      await groupsGroupsSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersTeachers',
      await usersTeachersSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ActivitiesActivities',
      await activitiesActivitiesSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'SchedulesSemesters',
      schedulesSemestersSeed,
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'SchedulesVersions',
      await schedulesVersionsSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ImportancesDemands',
      await importancesDemandsSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'ImportancesEquipments',
      await importancesEquipmentsSeedFun(),
    );

    setMigrationsRecordsData(MRD);

    console.log('wykonano migrację DATA_TEST');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let structures = await getRepository('StructuresStructures').find();
    structures = structures.map((structure) => {
      structure['parent_structure'] = null;
      return structure;
    });
    await getRepository('StructuresStructures').save(structures);

    await removeSeeds(queryRunner, MIGRATION_NAME);

    console.log('wykonano cofnięcie migracji DATA_TEST');
  }
}
