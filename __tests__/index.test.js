import { getFixturePath, readFile } from '../utils/utils.js';
import genDiff from '../src/index.js';

describe('test gendiff', () => {
  it('gendiff works', () => {
    const firstFilePath = getFixturePath('file1.json');
    const secondFilePath = getFixturePath('file2.json');
    const expected = readFile('flat_result.txt').trim();
    const result = genDiff(firstFilePath, secondFilePath);
    expect(result).toBe(expected);
  });
});
