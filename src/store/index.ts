import Vue from 'vue';
import Vuex from 'vuex';
import { createGame, extractSudokuCells, SudokuCell } from '@/sudoku/sudoku.utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sudoku: {
      namespaced: true,
      mutations: {
        focusCell(state, { row, col }) {
          state.focusedCell = { row, col };
        },
        initialiseGame(state, difficulty = 'easy') {
          const newGame = createGame(difficulty);
          const gameString = newGame.solution;
          const originalsString = newGame.puzzle.replaceAll('-', ' ');

          state.gameString = gameString;
          state.originalsString = originalsString;
          state.cells = extractSudokuCells({
            gameString,
            originalsString,
          });
        },
        setCellValue(state, { row, col, value }) {
          state.cells[9 * row + col].userInput = value;
        },
      },
      state: () => ({
        cells: [],
        focusedCell: {
          row: -1,
          col: -1,
        },
        gameString: '',
        originalsString: '',
      }),
      getters: {
        duplicates: (state, getters) => getters.mistakes
          .filter((mistakeCell: SudokuCell) => state.cells.some(
            (cell: SudokuCell) => (
              cell.userInput === mistakeCell.userInput
              && cell.index !== mistakeCell.index
              && (
                cell.column === mistakeCell.column
                || cell.row === mistakeCell.row
                || cell.square === mistakeCell.square)
            ),
          )),
        mistakes: (state) => state.cells
          .filter((cell: SudokuCell) => cell.original === ' '
          && cell.userInput !== cell.correctValue
          && cell.userInput !== ' '),
        userInputsString: (state) => state.cells.map((cell: SudokuCell) => cell.userInput).join(''),
      },
    },
  },
});
