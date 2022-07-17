import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import usersStatusesSeed from '../data/solid/usersStatuses.seed';
import usersPermissionsSeed from 'src/data/solid/usersPermissions.seed';
import schedulesStatusesSeed from 'src/data/solid/schedulesStatuses.seed';
import schedulesUnitsSeed from 'src/data/solid/schedulesUnits.seed';
import structuresLevelsSeed from 'src/data/solid/structuresLevels.seed';
import { getMigrationsRecordsData } from 'src/utils/exploring';
import { saveSeeds, setMigrationsRecordsData } from 'src/utils/saving';
import { removeSeeds } from 'src/utils/removing';

const MIGRATION_NAME = 'DATA_SOLID';
export class FIRSTMIGRATION1630524453168 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    var MRD = getMigrationsRecordsData();
    MRD[MIGRATION_NAME] = {};

    await saveSeeds(MIGRATION_NAME, MRD, 'UsersStatuses', usersStatusesSeed);

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'UsersPermissions',
      usersPermissionsSeed,
    );

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'SchedulesStatuses',
      schedulesStatusesSeed,
    );

    await saveSeeds(MIGRATION_NAME, MRD, 'SchedulesUnits', schedulesUnitsSeed);

    await saveSeeds(
      MIGRATION_NAME,
      MRD,
      'StructuresLevels',
      structuresLevelsSeed,
    );

    setMigrationsRecordsData(MRD);
    console.log('wykonano migrację DATA_SOLID');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await removeSeeds(queryRunner, MIGRATION_NAME);

    console.log('wykonano cofnięcie migracji DATA_SOLID');
  }
}
