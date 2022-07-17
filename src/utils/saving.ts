import { getRepository } from 'typeorm';
import { MRD_PATH } from './consts';
const fs = require('fs');

export const saveSeeds = async (
  migrationName: string,
  jsonObject: {
    [key: string]: any;
  },
  entity: string,
  data: any[],
) => {
  await getRepository(entity).save(data);
  const foundData = await getRepository(entity).findByIds(data);
  jsonObject[migrationName][entity] = foundData.map(
    (record: { id: number }) => record.id,
  );

  return foundData;
};

export const setMigrationsRecordsData = (jsonObject: {
  [key: string]: any;
}) => {
  fs.writeFileSync(MRD_PATH, JSON.stringify(jsonObject));
};
