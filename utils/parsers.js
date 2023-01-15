import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const openFile = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');

export default function parseFile(filePath) {
  const file = openFile(filePath);
  const ext = path.extname(filePath);

  if (ext.toLowerCase() === '.json') {
    return JSON.parse(file);
  }
  if (ext.toLowerCase() === '.yml' || ext.toLowerCase() === '.yaml') {
    return yaml.load(file);
  }
  return null;
}
