import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default function getFormatter(formatterName) {
  switch (formatterName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      break;
  }
  return null;
}
