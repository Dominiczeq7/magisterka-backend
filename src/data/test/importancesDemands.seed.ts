import ActivitiesActivities from 'src/entities/activities/activities.activities.entity';
import ImportancesDemands from 'src/entities/importances/importances.demands.entity';
import { findInObjArray } from 'src/utils/exploring';

export const importancesDemandsSeedFun = async (): Promise<
  Partial<ImportancesDemands>[]
> => {
  const activities = await ActivitiesActivities.find();

  return [
    {
      remote_rating: 0,
      activity: [activities[0]],
    },
    {
      remote_rating: 0,
      activity: [activities[1]],
    },
    {
      remote_rating: 0,
      activity: [activities[2]],
    },
    {
      remote_rating: 0,
      activity: [activities[3]],
    },
    {
      remote_rating: 0,
      activity: [activities[4]],
    },
  ];
};

export default importancesDemandsSeedFun;
