import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const first = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const second = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const keys = _.union(_.keys(first), _.keys(second));
  const diff = keys.sort().map((key) => {
    let result = '';
    if (Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      if (first[key] === second[key]) {
        result += `  ${key}: ${first[key]}`;
      } else if (first[key] !== second[key]) {
        result += `- ${key}: ${first[key]}`;
        result += `+ ${key}: ${second[key]}`;
      }
    } else if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      result += `+ ${key}: ${second[key]}`;
    } else if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) {
      result += `- ${key}: ${first[key]}`;
    }
    return result;
  });
  return `{
   ${diff.join('\n   ')}
 }`;
};

export default genDiff;
