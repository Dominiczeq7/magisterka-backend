import ActivitiesTypes from 'src/entities/activities/activities.types.entity';

export const activitiesTypesSeed: Partial<ActivitiesTypes>[] = [
  {
    name: 'wykład',
  },
  {
    name: 'laboratorium',
  },
  {
    name: 'ćwiczenia',
  },
  {
    name: 'seminarium',
  },
];

export default activitiesTypesSeed;
