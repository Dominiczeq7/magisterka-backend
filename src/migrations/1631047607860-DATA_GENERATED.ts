import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import usersUsersGenSeedFun from 'src/data/generated/usersUsers.seed';
import UsersUsers from 'src/entities/users/users.users.entity';
import usersStudentsGenSeedFun from 'src/data/generated/usersStudents.seed';
import { getMigrationsRecordsData } from 'src/utils/exploring';
import { removeSeeds } from 'src/utils/removing';
import { saveSeeds, setMigrationsRecordsData } from 'src/utils/saving';
import setClassroomsEquipmentSeedFun from 'src/data/generated/setClassroomsEquipment.seed';
import usersTeachersGenSeedFun from 'src/data/generated/usersTeachers.seed';

const USERS_QUANTITY = 500;
const STUDENTS_TEACHERS_PROP = 9 / 10;
const MIGRATION_NAME = 'DATA_GENERATED';

export class TEST1631047607860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    var MRD = getMigrationsRecordsData();
    MRD[MIGRATION_NAME] = {};

    const foundUsers = await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersUsers',
      await usersUsersGenSeedFun(USERS_QUANTITY),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersStudents',
      await usersStudentsGenSeedFun(
        foundUsers.slice(
          0,
          foundUsers.length * STUDENTS_TEACHERS_PROP,
        ) as UsersUsers[],
      ),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersTeachers',
      await usersTeachersGenSeedFun(
        foundUsers.slice(
          foundUsers.length * STUDENTS_TEACHERS_PROP,
          foundUsers.length,
        ) as UsersUsers[],
      ),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'SetClassroomsEquipment',
      await setClassroomsEquipmentSeedFun(),
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'SetClassroomsEquipment',
      await setClassroomsEquipmentSeedFun(),
    );

    setMigrationsRecordsData(MRD);

    console.log('wykonano migrację DATA_GENERATED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await removeSeeds(queryRunner, MIGRATION_NAME);

    console.log('wykonano cofnięcia migracji DATA_GENERATED');
  }
}
