import { MRD_PATH } from './consts';
import { getRandomInt } from './generating';
const fs = require('fs');

export const findInObjArray = (
  array: any[],
  value: any,
  by: string = 'name',
  returnFirst: boolean = true,
) => {
  const foundElements = array.filter(
    (element) => element[by] == value || shallowEqual(element[by], value),
  );
  if (foundElements) {
    if (returnFirst) {
      return foundElements[0];
    } else {
      return foundElements;
    }
  } else {
    return null;
  }
};

export const getRandomFromArray = (array: any[]) => {
  const index = getRandomInt(0, array.length);
  const element = array[index];
  return element;
};

export const getMigrationsRecordsData = (): {
  [key: string]: any;
} => {
  var MRD: {
    [key: string]: any;
  } = JSON.parse(fs.readFileSync(MRD_PATH, 'utf8'));

  return MRD;
};

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
