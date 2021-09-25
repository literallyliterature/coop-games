import { uniq } from 'lodash';

export { getSudoku as createGame } from 'sudoku-gen';

type CellRange = 0|1|2|3|4|5|6|7|8;
type ValueRange = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';
type UserInputValueRange = ValueRange|'-';
type SudokuCell = {
  column: CellRange,
  index: number,
  row: CellRange,
  square: CellRange, // starting with 0|1|2 in the top row
  value: ValueRange,
};
type UserInputSudokuCell = SudokuCell & {
  originalInput: UserInputValueRange,
  userInput: UserInputValueRange,
};
type GameStatus = {
  duplicates?: SudokuCell[],
  mistakes?: SudokuCell[],
  complete?: boolean,
};

export function analyseGameProgress({
  gameString,
  originalInputsString,
  userInputsString,
}: {
  gameString: string,
  originalInputsString: string,
  userInputsString: string,
}): GameStatus {
  if (gameString === userInputsString) return { complete: true };

  const cells = extractSudokuCells(gameString);
  const originalInputs = originalInputsString.split('');
  const userInputs = userInputsString.split('');
  const userInputCells = cells.map((cell, index) => ({
    ...cell,
    originalInput: originalInputs[index],
    userInput: userInputs[index],
  })) as UserInputSudokuCell[];

  const userEditableCells = userInputCells.filter((cell) => cell.originalInput === '-');
  const mistakes = userEditableCells.filter((cell) => cell.userInput !== cell.value && cell.userInput !== '-');
  const duplicates = mistakes.filter(
    (mistake) => userInputCells.some(
      (cell) => (
        cell.userInput === mistake.userInput
        && cell.index !== mistake.index
        && (
          cell.column === mistake.column
          || cell.row === mistake.row
          || cell.square === mistake.square)
      ),
    ),
  );
  return { duplicates, mistakes };
}

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
