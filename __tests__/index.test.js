import { getFixturePath, readFile } from '../utils/utils.js';
import genDiff from '../src/index.js';

describe('test gendiff stylish format', () => {
  it('gendiff works with json', () => {
    const firstFilePath = getFixturePath('file1.json');
    const secondFilePath = getFixturePath('file2.json');
    const expected = readFile('result.stylish').trim();
    const result = genDiff(firstFilePath, secondFilePath);
    expect(result).toBe(expected);
  });

  it('gendiff works with yaml', () => {
    const firstFilePath = getFixturePath('file1.yaml');
    const secondFilePath = getFixturePath('file2.yaml');
    const expected = readFile('result.stylish').trim();
    const result = genDiff(firstFilePath, secondFilePath);
    expect(result).toBe(expected);
  });
});

describe('test gendiff plain format', () => {
  it('gendiff works with json', () => {
    const firstFilePath = getFixturePath('file1.json');
    const secondFilePath = getFixturePath('file2.json');
    const expected = readFile('result.plain').trim();
    const result = genDiff(firstFilePath, secondFilePath, "plain");
    expect(result).toBe(expected);
  });

  it('gendiff works with yaml', () => {
    const firstFilePath = getFixturePath('file1.yaml');
    const secondFilePath = getFixturePath('file2.yaml');
    const expected = readFile('result.plain').trim();
    const result = genDiff(firstFilePath, secondFilePath, "plain");
    expect(result).toBe(expected);
  });
});

describe('test gendiff json format', () => {
  it('gendiff works with json', () => {
    const firstFilePath = getFixturePath('file1.json');
    const secondFilePath = getFixturePath('file2.json');
    const expected = readFile('result.json').trim();
    const result = genDiff(firstFilePath, secondFilePath, "json");
    expect(result).toBe(expected);
  });

  it('gendiff works with yaml', () => {
    const firstFilePath = getFixturePath('file1.yaml');
    const secondFilePath = getFixturePath('file2.yaml');
    const expected = readFile('result.json').trim();
    const result = genDiff(firstFilePath, secondFilePath, "json");
    expect(result).toBe(expected);
  });
});
