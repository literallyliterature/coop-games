<template>
  <v-row justify="center" no-gutters>
    <v-col
      v-if="gameStatus === 'started'"
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
                    :is-game-complete="gameStatus === 'completed'"
                    @focused="setFocusedRowAndCol"
                    @keyPressed="triggerKeyPress" />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>

      <SudokuControls
        class="mt-12"
        :in-notes-mode.sync="inNotesMode"
        :saved-states="savedStates"
        @action="triggerUserAction"
        @restore-state="restoreState"
        @save-state="saveCurrentState" />
    </v-col>

    <v-col cols="auto" v-else>
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
        color="primary"
        small
        @click="initialiseGame(selectedDifficulty)">
        Start
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
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

  savedStates: SavedState[] = [];

  selectedDifficulty: SudokuGameDifficulty = 'easy';

  // eslint-disable-next-line class-methods-use-this
  getColIndex(squareCol:1|2|3, cellCol:1|2|3): number {
    return 3 * (squareCol - 1) + (cellCol - 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getRowIndex(squareRow:1|2|3, cellRow:1|2|3): number {
    return 3 * (squareRow - 1) + (cellRow - 1);
  }

  initialiseGame(difficulty: SudokuGameDifficulty): void {
    console.log(difficulty);
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
  }

  saveCurrentState(label: string): void {
    if (!label) return;

    this.savedStates.push({
      label,
      cells: cloneDeep(this.game?.cells) || [],
    });
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
    } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(action)) {
      const setNotes = this.inNotesMode ? !ctrlKey : !!ctrlKey;

      if (this.gameStatus !== 'completed' && currentCell.original === ' ') {
        if (!setNotes) currentCell.userInput = action as UserInputValueRange;
        else if (currentCell.userInput === ' ') Vue.set(currentCell.notedNumbers, action, true);
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
}
</script>
