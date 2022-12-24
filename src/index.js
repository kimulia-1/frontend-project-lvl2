import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const first = JSON.parse(readFile(filepath1));
  const second = JSON.parse(readFile(filepath2));
  const keys = _.union(_.keys(first), _.keys(second));
  const diff = keys.sort().map((key) => {
    let result = '';
    if (Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      if (first[key] === second[key]) {
        result += `  ${key}: ${first[key]}`;
      } else if (first[key] !== second[key]) {
        result += `- ${key}: ${first[key]} \n   `;
        result += `+ ${key}: ${second[key]}`;
      }
    } else if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      result += `+ ${key}: ${second[key]}`;
    } else if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) {
      result += `- ${key}: ${first[key]}`;
    }
    return result;
  });
  const joinResult = `{
   ${diff.join('\n   ')}
}`;
  console.log(joinResult);
  return joinResult;
};

export default genDiff;
