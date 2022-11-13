import * as fs from 'node:fs';
import path from 'node:path';
import _ from "lodash";

const indent = ' ';

const genDiff = (filepath1, filepath2) => {
  try {
    const json1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
    const json2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

    const config1 = JSON.parse(json1);
    const config2 = JSON.parse(json2);

    const parts = []
    
    const {newKeys, removedKeys, commonKeys} = getKeys(config1, config2);

    newKeys.map((key) => parts.push({
      sign: "+",key: key, value: config2[key]
    }))
    removedKeys.map((key) => parts.push({
      sign: "-",key: key, value: config1[key]
    }))
    commonKeys.map((key) => {
      if (config1[key] === config2[key]) {
        parts.push({
          sign: " ",key: key, value: config1[key]
        })
        return
      }
      parts.push({
        sign: "-",key: key, value: config1[key]
      })
      parts.push({
        sign: "+",key: key, value: config2[key]
      })
    })

    const sorted_parts = _.sortBy(parts, ['key', '-sign'])
    const diff = makeDiff(sorted_parts);
    console.log(diff)
    return diff
  } catch (err) {
    console.error(err);
  }
};

const getKeys = (firstData, secondData) => {
  const keys1 = Object.keys(firstData);
  const keys2 = Object.keys(secondData);
  const newKeys = _.difference(keys2, keys1);
  const removedKeys = _.difference(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);
  return {newKeys, removedKeys, commonKeys};
}

const makeDiff = (parts) => {
  const strings = parts.reduce((acc, part) => {
    acc.push(`${indent}${part.sign} ${part.key}: ${part.value}`)
    return acc
  }, [])
  const diff = `{\n${strings.join('\n')}\n}`
  return diff
}

export default genDiff;
