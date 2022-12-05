import _ from 'lodash';
import parseFile from '../utils/parsers.js';

const indent = '  ';

const getKeys = (firstData, secondData) => {
  const keys1 = Object.keys(firstData);
  const keys2 = Object.keys(secondData);
  const newKeys = _.difference(keys2, keys1);
  const removedKeys = _.difference(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);
  return { newKeys, removedKeys, commonKeys };
};

const makeDiff = (parts) => {
  const strings = parts.reduce((acc, part) => {
    acc.push(`${indent}${part.sign} ${part.key}: ${part.value}`);
    return acc;
  }, []);
  const diff = `{\n${strings.join('\n')}\n}`;
  return diff;
};

export default function genDiff(filePath1, filePath2) {
  try {
    const config1 = parseFile(filePath1);
    const config2 = parseFile(filePath2);

    const parts = [];

    const { newKeys, removedKeys, commonKeys } = getKeys(config1, config2);

    newKeys.forEach((key) => parts.push({
      sign: '+', key, value: config2[key],
    }));
    removedKeys.forEach((key) => parts.push({
      sign: '-', key, value: config1[key],
    }));
    commonKeys.forEach((key) => {
      if (config1[key] === config2[key]) {
        parts.push({
          sign: ' ', key, value: config1[key],
        });
        return;
      }
      parts.push({
        sign: '-', key, value: config1[key],
      });
      parts.push({
        sign: '+', key, value: config2[key],
      });
    });

    const sortedParts = _.sortBy(parts, ['key', '-sign']);
    const diff = makeDiff(sortedParts);
    console.log(diff);
    return diff;
  } catch (err) {
    console.error(err);
  }
  return null;
}
