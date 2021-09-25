import { uniq } from 'lodash';

export { getSudoku as createGame } from 'sudoku-gen';

type CellRange = 0|1|2|3|4|5|6|7|8;
type ValueRange = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';
type SudokuCell = {
  column: CellRange,
  index: number,
  row: CellRange,
  square: CellRange, // starting with 0|1|2 in the top row
  value: ValueRange,
};

export function calculateColumnFromIndex(index: number): CellRange {
  return index % 9 as CellRange;
}

export function calculateRowFromIndex(index: number): CellRange {
  return Math.floor(index / 9) as CellRange;
}

export function calculateSquareFromIndex(index: number): CellRange {
  const column = calculateColumnFromIndex(index);
  const row = calculateRowFromIndex(index);
  const { floor } = Math;
  return ((3 * floor(row / 3)) + floor(column / 3)) as CellRange;
}

export function findCellsWithMistakes(gameString: string): SudokuCell[] {
  const columnDuplicates = findCellsWithDuplicatesInColumns(gameString);
  const rowDuplicates = findCellsWithDuplicatesInRows(gameString);
  const squareDuplicates = findCellsWithDuplicatesInSquare(gameString);
  return uniq([
    ...columnDuplicates,
    ...rowDuplicates,
    ...squareDuplicates,
  ]);
}

function findCellsWithDuplicatesInColumns(gameString: string): SudokuCell[] {
  if (gameString.length) return [];
  return [];
}

function findCellsWithDuplicatesInRows(gameString: string): SudokuCell[] {
  if (gameString.length) return [];
  return [];
}

function findCellsWithDuplicatesInSquare(gameString: string): SudokuCell[] {
  if (gameString.length) return [];
  return [];
}

export function extractSudokuCells(gameString: string): SudokuCell[] {
  return gameString.split('').map((value, index) => ({
    column: calculateColumnFromIndex(index),
    index,
    row: calculateRowFromIndex(index),
    square: calculateSquareFromIndex(index),
    value: value as ValueRange,
  }));
}
