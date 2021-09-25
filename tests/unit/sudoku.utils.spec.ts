import { calculateSquareFromIndex } from '../../src/sudoku/sudoku.utils';

describe('calculateSquareFromIndex', () => {
  it.each([
    [0, 0],
    [9, 0],
    [5, 1],
    [14, 1],
    [6, 2],
    [34, 5],
    [70, 8],
  ])('for index %s, returns %s', (inputIndex, expectedSquareOutput) => {
    expect(calculateSquareFromIndex(inputIndex)).toBe(expectedSquareOutput);
  });
});
