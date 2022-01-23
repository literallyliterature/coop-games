<template>
  <v-row
    justify="center"
    no-gutters
    style="max-width: 400px; margin: auto">
    <v-col
      v-if="gameStatus === 'started' || gameStatus === 'completed'"
      cols="auto">
      <div style="border: 1px solid rgba(0, 0, 0, 0.2)">
        <v-row
          v-for="squareRow in 3"
          :key="squareRow"
          no-gutters>
          <v-col
            v-for="squareCol in 3"
            :key="squareCol"
            cols="auto"
            no-gutters>
            <div style="border: 1px solid rgba(0, 0, 0, 0.7)">
              <v-row
                v-for="rowIndex in 3"
                :key="rowIndex"
                no-gutters>
                <v-col
                  v-for="colIndex in 3"
                  :key="colIndex">
                  <SudokuCell
                    :ref="`cell-${getRowIndex(squareRow, rowIndex)}-${getColIndex(squareCol, colIndex)}`"
                    :cell="game.cells[getRowIndex(squareRow, rowIndex)][getColIndex(squareCol, colIndex)]"
                    :is-focused="getRowIndex(squareRow, rowIndex) === game.focusedRow &&
                      getColIndex(squareCol, colIndex) === game.focusedCol"
                    :is-game-complete="gameStatus === 'completed'"
                    :mistake="checkIfCellHasAMistake({
                      squareRow, rowIndex, squareCol, colIndex,
                    })"
                    @focused="setFocusedRowAndCol"
                    @keyPressed="triggerKeyPress" />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>

      <SudokuControls
        v-if="gameStatus === 'started'"
        class="mt-12"
        :disable-undo-button="!savedUndoStates.length"
        :in-notes-mode.sync="inNotesMode"
        @action="triggerUserAction"
        @undo="undoState" />
    </v-col>

    <v-col cols="12" v-if="gameStatus === 'completed'" />

    <v-col v-if="gameStatus !== 'started'" cols="auto" class="mt-12">
      <v-chip-group
        v-model="selectedDifficulty"
        color="primary"
        column
        mandatory>
        <v-chip
          v-for="difficulty in ['easy', 'medium', 'hard', 'expert']"
          :key="difficulty"
          outlined
          :value="difficulty"
          v-text="difficulty" />
      </v-chip-group>

      <v-btn
        block
        class="mt-4"
        color="primary darken-3"
        small
        @click="initialiseGame(selectedDifficulty)">
        Start
      </v-btn>
    </v-col>

    <v-col
      v-if="gameStatus === 'started'"
      class="mt-6"
      cols="8">
      <v-btn
        block
        color="grey lighten-1"
        outlined
        @click="checkForMistakes">
        Check for mistakes
      </v-btn>
    </v-col>

    <v-col
      v-if="gameStatus === 'started'"
      class="mt-6"
      cols="8">
      <v-menu
        v-model="showingMenu"
        bottom
        :close-on-content-click="false"
        offset-y
        @input="resetSaveInput">
        <template #activator="{ on, attrs }">
          <v-btn
            block
            color="grey lighten-1"
            outlined
            v-bind="attrs"
            v-on="on">
            Save states
          </v-btn>
        </template>

        <v-card min-width="150px">
          <div
            v-if="!showNewSaveInput"
            class="text-left pa-4"
            :class="savedStates.length ? 'pb-0' : ''">
            <a
              class="text-body-2"
              @click="showNewSaveInput = true">
              Save current state
            </a>
          </div>
          <v-form
            v-else
            class="pa-2 pl-4 pb-4"
            @submit.prevent="saveState">
            <v-text-field
              autofocus
              hide-details
              label="Save state as"
              @blur="saveCurrentState"
              v-model="newSaveStateLabel" />
          </v-form>

          <v-list v-if="savedStates.length">
            <v-list-item
              v-for="(savedState, index) in savedStates"
              :key="index"
              @click="restoreState(savedState.cells)">
              {{ savedState.label }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-col>

    <!-- <v-col
      class="mt-12"
      cols="8">
      <v-menu
        :close-on-content-click="false"
        offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            block
            outlined>
            Settings
          </v-btn>
        </template>

        <v-card
          class="pa-4"
          min-width="150px">
          <v-checkbox
            v-model="darkMode"
            label="Dark mode" />
        </v-card>
      </v-menu>
    </v-col> -->

    <v-snackbar
      v-model="showingSnackbar"
      :color="snackbarColour"
      top>
      {{ snackbarText }}
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import {
  cloneDeep, flatten, flattenDeep, uniqBy,
} from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import {
  CellRange,
  createGame,
  extractSudokuCells,
  SudokuCell as SudokuCellType,
  UserInputValueRange,
  ValueRange,
} from '@/sudoku/sudoku.utils';
import SudokuCell from './SudokuCell.vue';
import SudokuControls from './SudokuControls.vue';

type SudokuGameDifficulty = 'easy'|'medium'|'hard'|'expert';
type UserActionArrow = 'left'|'up'|'right'|'down';
type UserActionDiagonals = 'up-left'|'up-right'|'down-left'|'down-right';
type UserAction = UserActionArrow|UserActionDiagonals|ValueRange|'del';
interface SavedState {
  cells: SudokuCellType[][],
  label: string,
}
interface SudokuGame {
  cells: SudokuCellType[][],
  difficulty: SudokuGameDifficulty,
  focusedCol: CellRange,
  focusedRow: CellRange,
  gameString: string,
  originalsString: string,
}
interface InputRowAndCol {
  row: undefined|CellRange,
  col: undefined|CellRange
}
interface CheckMistakesInput {
  squareRow: 1|2|3,
  squareCol: 1|2|3,
  colIndex: 1|2|3,
  rowIndex: 1|2|3,
}

@Component({
  components: {
    SudokuCell,
    SudokuControls,
  },
})
export default class Sudoku extends Vue {
  game: null|SudokuGame = null;

  gameStatus: 'uninitialised'|'started'|'completed' = 'uninitialised';

  inNotesMode = false;

  mistakesToShow: InputRowAndCol[] = [];

  newSaveStateLabel = '';

  savedStates: SavedState[] = [];

  savedUndoStates: SavedState[] = [];

  selectedDifficulty: SudokuGameDifficulty = 'easy';

  showingMenu = false;

  showingSnackbar = false;

  showNewSaveInput = false;

  snackbarColour = 'success';

  snackbarText = 'You completed it. Great job!';

  get flattenedCells(): SudokuCellType[] {
    if (!this.game) return [];
    return flatten(this.game.cells);
  }

  get allRows(): SudokuCellType[][] {
    if (!this.game) return [];
    return this.game.cells;
  }

  get allCols(): SudokuCellType[][] {
    if (!this.game) return [];
    const newArr: SudokuCellType[][] = [];
    this.flattenedCells.forEach((cell) => {
      if (!newArr[cell.column]) newArr[cell.column] = [];
      newArr[cell.column].push(cell);
    });
    return newArr;
  }

  get allSquares(): SudokuCellType[][] {
    if (!this.game) return [];
    const newArr: SudokuCellType[][] = [];
    this.flattenedCells.forEach((cell) => {
      if (!newArr[cell.square]) newArr[cell.square] = [];
      newArr[cell.square].push(cell);
    });
    return newArr;
  }

  // eslint-disable-next-line class-methods-use-this
  getColIndex(squareCol:1|2|3, cellCol:1|2|3): number {
    return 3 * (squareCol - 1) + (cellCol - 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getRowIndex(squareRow:1|2|3, cellRow:1|2|3): number {
    return 3 * (squareRow - 1) + (cellRow - 1);
  }

  initialiseGame(difficulty: SudokuGameDifficulty): void {
    const newGame = createGame(difficulty);
    const gameString = newGame.solution;
    const originalsString = newGame.puzzle.replaceAll('-', ' ');
    const cellsFlatArray = extractSudokuCells({
      gameString,
      originalsString,
    });
    const cells: SudokuCellType[][] = [];

    cellsFlatArray.forEach((cell) => {
      if (!cells[cell.row]) cells[cell.row] = [];

      cells[cell.row][cell.column] = cell;
    });

    this.gameStatus = 'started';
    this.game = {
      cells,
      difficulty: this.selectedDifficulty,
      focusedCol: 0,
      focusedRow: 0,
      gameString,
      originalsString,
    };
  }

  restoreState(cells: SudokuCellType[][]): void {
    if (this.game) this.game.cells = cloneDeep(cells);
    this.savedUndoStates = [];
  }

  resetSaveInput(): void {
    this.showNewSaveInput = false;
    this.newSaveStateLabel = '';
  }

  saveState(): void {
    this.saveCurrentState(this.newSaveStateLabel);
    this.resetSaveInput();
    this.showingMenu = false;
  }

  saveCurrentState(label: string): void {
    if (!label) return;

    this.savedStates.push({
      label,
      cells: cloneDeep(this.game?.cells) || [],
    });
  }

  saveUndoState(): void {
    this.savedUndoStates.push({
      label: (new Date()).toString(),
      cells: cloneDeep(this.game?.cells) || [],
    });
  }

  undoState(): void {
    if (!this.game || !this.savedUndoStates.length) return;

    const restoredCells = this.savedUndoStates.pop();
    if (restoredCells) this.restoreState(restoredCells.cells);
  }

  setFocusedRowAndCol({ row, col }: InputRowAndCol): void {
    if (this.game && col !== undefined) this.game.focusedCol = col;
    if (this.game && row !== undefined) this.game.focusedRow = row;

    const ref = this.$refs[`cell-${this.game?.focusedRow}-${this.game?.focusedCol}`];
    // @ts-expect-error asdf
    const f = ref[0]?.focus;
    if (f) f();
  }

  triggerKeyPress(e: KeyboardEvent): void {
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const { key } = e;

    const keyToActionMapping = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
      Backspace: 'del',
      Delete: 'del',
    };

    if (numberKeys.includes(key)) this.triggerUserAction(key as UserAction, e?.ctrlKey);
    // @ts-expect-error asdf
    if (keyToActionMapping[key]) this.triggerUserAction(keyToActionMapping[key] as UserAction);
  }

  triggerUserAction(action: UserAction, ctrlKey: boolean): void {
    if (!this.game) return;

    const {
      cells, focusedRow, focusedCol,
    } = this.game;
    const currentCell = cells[focusedRow][focusedCol];

    if (action === 'left') this.setFocusedRowAndCol({ col: Math.max((focusedCol - 1), 0) as CellRange } as InputRowAndCol); // eslint-disable-line max-len
    else if (action === 'up') this.setFocusedRowAndCol({ row: Math.max((focusedRow - 1), 0) as CellRange } as InputRowAndCol); // eslint-disable-line max-len
    else if (action === 'right') this.setFocusedRowAndCol({ col: Math.min((focusedCol + 1), 8) as CellRange } as InputRowAndCol); // eslint-disable-line max-len
    else if (action === 'down') this.setFocusedRowAndCol({ row: Math.min((focusedRow + 1), 8) as CellRange } as InputRowAndCol); // eslint-disable-line max-len
    else if (action === 'del') {
      currentCell.notedNumbers = {};
      currentCell.userInput = currentCell.original;
      if (this.mistakesToShow.length) this.checkForMistakes();
    } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(action)) {
      const setNotes = this.inNotesMode ? !ctrlKey : !!ctrlKey;

      if (this.gameStatus !== 'completed' && currentCell.original === ' ') {
        if (!setNotes) {
          if (currentCell.userInput !== action) {
            this.saveUndoState();
            currentCell.userInput = action as UserInputValueRange;
            this.checkIfGameIsCompleted();
            if (this.mistakesToShow.length) this.checkForMistakes();
            this.removeAdjacentNotes(currentCell);
          }
        } else if (currentCell.userInput === ' ') {
          Vue.set(currentCell.notedNumbers, action, !currentCell.notedNumbers[action]);
        }
      }
    } else if (['up-left', 'up-right', 'down-left', 'down-right'].includes(action)) {
      const actions = action.split('-');
      actions.forEach((a) => this.triggerUserAction(a as UserActionDiagonals, ctrlKey));
    }

    this.setFocusedRowAndCol({} as InputRowAndCol);
  }

  get gameStarted(): boolean {
    return this.gameStatus === 'started';
  }

  checkIfGameIsCompleted(): void {
    if (this.flattenedCells.every((cell) => cell.correctValue === cell.userInput)) {
      this.gameStatus = 'completed';
      this.showingSnackbar = true;
    }
  }

  checkForMistakes(): void {
    const findDuplicatesIn9Cells = (cells: SudokuCellType[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: any = {};
      cells.forEach((cell) => {
        results[cell.userInput] = (results[cell.userInput] || 0) + 1;
      });
      return cells.filter((cell) => results[cell.userInput] > 1 && cell.userInput !== ' ' && cell.original === ' ');
    };

    const rowMistakes = this.allRows.map(findDuplicatesIn9Cells).filter((v) => v?.length);
    const colMistakes = this.allCols.map(findDuplicatesIn9Cells).filter((v) => v?.length);
    const squareMistakes = this.allSquares.map(findDuplicatesIn9Cells).filter((v) => v?.length);
    const allMistakes = [
      ...rowMistakes,
      ...colMistakes,
      ...squareMistakes,
    ];

    const flattenedMistakes = flattenDeep(allMistakes).map((cell) => ({ row: cell.row, col: cell.column }));
    this.mistakesToShow = uniqBy(flattenedMistakes, ({ row, col }) => `${row}-${col}`);
  }

  checkIfCellHasAMistake({
    squareRow, squareCol, colIndex, rowIndex,
  }: CheckMistakesInput): boolean {
    const c = this.getColIndex(squareCol, colIndex);
    const r = this.getRowIndex(squareRow, rowIndex);
    return this.mistakesToShow.some(({ row, col }) => row === r && col === c);
  }

  removeAdjacentNotes(cell: SudokuCellType): void {
    const enteredValue = cell.userInput;
    if (!enteredValue) return;

    const allAdjacentCells = [
      ...this.allRows[cell.row],
      ...this.allCols[cell.column],
      ...this.allSquares[cell.square],
    ];
    const flattenedCells = flattenDeep(allAdjacentCells);
    flattenedCells.forEach((c) => {
      c.notedNumbers[enteredValue] = false; // eslint-disable-line no-param-reassign
    });
  }
}
</script>
