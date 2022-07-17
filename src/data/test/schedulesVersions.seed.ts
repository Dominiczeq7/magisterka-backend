import SchedulesStatuses from 'src/entities/schedules/schedules.statuses.entity';
import SchedulesVersions from 'src/entities/schedules/schedules.versions.entity';
import { findInObjArray } from 'src/utils/exploring';

export const schedulesVersionsSeedFun = async (): Promise<
  Partial<SchedulesVersions>[]
> => {
  const statuses = await SchedulesStatuses.find();

  return [
    {
      number: 1,
      status: findInObjArray(statuses, 'historyczna'),
    },
    {
      number: 2,
      status: findInObjArray(statuses, 'aktualna'),
    },
  ];
};

export default schedulesVersionsSeedFun;
