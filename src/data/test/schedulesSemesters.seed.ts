import SchedulesSemesters from 'src/entities/schedules/schedules.semesters.entity';

const schedulesSemestersSeedFun = (): Partial<SchedulesSemesters>[] => {
  const semesters = [];
  const dates = [
    {
      from: new Date(Date.parse('10/01/2020')),
      to: new Date(Date.parse('02/01/2021')),
    },
    {
      from: new Date(Date.parse('02/23/2021')),
      to: new Date(Date.parse('06/30/2021')),
    },
  ];

  semesters.push({
    revision_number: 1,
    date_from: dates[0].from,
    date_to: dates[0].to,
  });

  semesters.push({
    revision_number: 2,
    date_from: dates[1].from,
    date_to: dates[1].to,
  });

  return semesters;
};

export const schedulesSemestersSeed = schedulesSemestersSeedFun();

export default schedulesSemestersSeed;
