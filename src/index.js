import _ from 'lodash';
import parseFile from '../utils/parsers.js';
import getFormatter from '../formatters/index.js';

const getKeys = (firstData, secondData) => {
  const keys1 = Object.keys(firstData);
  const keys2 = Object.keys(secondData);
  const allKeys = _.union(keys1, keys2);
  const newKeys = _.difference(keys2, keys1);
  const removedKeys = _.difference(keys1, keys2);
  return { allKeys, newKeys, removedKeys };
};

const buildTree = (node1, node2) => {
  const { allKeys, newKeys, removedKeys } = getKeys(node1, node2);

  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.map((key) => {
    if (removedKeys.includes(key)) {
      return {
        type: 'removed', key, value: node1[key],
      };
    }

    if (newKeys.includes(key)) {
      return {
        type: 'added', key, value: node2[key],
      };
    }

    if (typeof node1[key] === 'object' && typeof node2[key] === 'object') {
      return {
        type: 'nested', key, children: buildTree(node1[key], node2[key]),
      };
    }

    if (node1[key] === node2[key]) {
      return {
        type: 'unchanged', key, value: node1[key],
      };
    }

    return {
      type: 'changed', key, oldValue: node1[key], newValue: node2[key],
    };
  });
};

export default function genDiff(filePath1, filePath2, format = 'stylish') {
  try {
    const config1 = parseFile(filePath1);
    const config2 = parseFile(filePath2);
    const tree = buildTree(config1, config2);
    const formatter = getFormatter(format);
    const diff = formatter(tree);
    return diff;
  } catch (err) {
    console.error(err);
  }
  return null;
}
