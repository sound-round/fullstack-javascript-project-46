import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const openFile = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');

export default function parseFile(filePath) {
  const file = openFile(filePath);
  const ext = path.extname(filePath);
  let parse;

  if (ext.toLowerCase() === '.json') {
    parse = JSON.parse;
  } else if (ext.toLowerCase() === '.yml' || ext.toLowerCase() === '.yaml') {
    parse = yaml.load;
  }

  return parse(file);
}
