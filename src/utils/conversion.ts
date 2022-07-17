export function updateFromPartial<T>(obj: T, updates: Partial<T>): T {
  return { ...obj, ...updates };
}

export function updateInObjArray(
  array: any[],
  findProp: any,
  findValue: any,
  updateProp: any,
  updateValue: any,
) {
  const index = array.findIndex((element) => element[findProp] == findValue);
  array[index][updateProp] = updateValue;
  return array;
}

export function weekDiff(date1, date2, useFloor = true) {
  let dateDiff =
    (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24 * 7);
  useFloor
    ? (dateDiff = Math.floor(dateDiff))
    : (dateDiff = Math.ceil(dateDiff));

  return Math.abs(dateDiff);
}

export function addMinutes(date: Date, m: number) {
  const newDate = new Date();
  newDate.setTime(date.getTime() + m * 60 * 1000);
  return newDate;
}
