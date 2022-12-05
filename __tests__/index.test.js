import { getFixturePath, readFile } from '../utils/utils.js';
import genDiff from '../src/index.js';

describe('test gendiff', () => {
  it('gendiff works with json', () => {
    const firstFilePath = getFixturePath('file1.json');
    const secondFilePath = getFixturePath('file2.json');
    const expected = readFile('flat_result.txt').trim();
    const result = genDiff(firstFilePath, secondFilePath);
    expect(result).toBe(expected);
  });

  it('gendiff works with yaml', () => {
    const firstFilePath = getFixturePath('file1.yaml');
    const secondFilePath = getFixturePath('file2.yaml');
    const expected = readFile('flat_result.txt').trim();
    const result = genDiff(firstFilePath, secondFilePath);
    expect(result).toBe(expected);
  });
});
