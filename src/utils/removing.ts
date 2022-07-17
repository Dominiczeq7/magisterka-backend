import { getRepository, QueryRunner } from 'typeorm';
import { MRD_PATH } from './consts';
import { getMigrationsRecordsData } from './exploring';

const fs = require('fs');

export const removeSeeds = async (
  queryRunner: QueryRunner,
  migrationName: string,
) => {
  var MRD = getMigrationsRecordsData();

  try {
    const entitiesNames = Object.keys(MRD[migrationName]).reverse();

    await Promise.all(
      await entitiesNames.map(async (entityName) => {
        await queryRunner.manager
          .getRepository(entityName)
          .delete(MRD[migrationName][entityName]);
      }),
    );
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    MRD[migrationName] = {};
    fs.writeFileSync(MRD_PATH, JSON.stringify(MRD));
  }
};
