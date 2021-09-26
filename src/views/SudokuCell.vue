<template>
  <div
    ref="div"
    class="sudoku-cell d-flex text--secondary"
    contenteditable
    readonly
    style="font-size: 11px"
    :style="readonly ? 'background: #f4f4f4' : ''"
    @focus="focusCell({ row, col })"
    @keydown.prevent="keyPressed">
    <div
      v-if="readonly"
      style="color: #222; font-size: 20px"
      v-text="cell.original" />

    <div
      v-else-if="cell.userInput !== ' '"
      :class="showAsError ? 'red--text text--lighten-1' : ''"
      style="font-size: 20px"
      :style="showAsError ? '' : 'color: #444'"
      v-text="cell.userInput" />

    <div
      v-else
      style="max-width: 35px; font-size: 9px"
      v-text="displayedNotes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations, mapState } from 'vuex';
import { calculateIndexFromRowAndCol, SudokuCell as SudokuCellType } from '@/sudoku/sudoku.utils';

const SudokuCellPropsAndMutations = Vue.extend({
  props: {
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },

  methods: {
    ...mapMutations('sudoku', ['focusCell']),
  },

  computed: {
    ...mapState('sudoku', ['focusedCell']),
  },

  watch: {
    focusedCell({ row, col }) {
      type ElementWithFocus = Element & {
        focus: () => void,
      };
      const div = this.$refs.div as ElementWithFocus;
      if (this.row === row && this.col === col && div?.focus) div.focus();
    },
  },
});

@Component({
})
export default class SudokuCell extends SudokuCellPropsAndMutations {
  notedNumbers: { [key: string]: boolean } = {};

  keyPressed(e: KeyboardEvent): void {
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const deleteKeys = ['Backspace', 'Delete'];
    const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

    const { key } = e;

    if (arrowKeys.includes(key)) {
      if (key === 'ArrowLeft') this.focusCell({ row: this.row, col: this.col - 1 });
      else if (key === 'ArrowRight') this.focusCell({ row: this.row, col: this.col + 1 });
      else if (key === 'ArrowUp') this.focusCell({ row: this.row - 1, col: this.col });
      else if (key === 'ArrowDown') this.focusCell({ row: this.row + 1, col: this.col });
      return;
    }

    if (this.readonly) return;

    if (numberKeys.includes(key)) {
      if (e.ctrlKey) {
        Vue.set(this.notedNumbers, key, !this.notedNumbers[key]);
      } else {
        this.$store.commit('sudoku/setCellValue', {
          col: this.col,
          row: this.row,
          value: key,
        });
      }
    } else if (deleteKeys.includes(key)) {
      this.notedNumbers = {};
      this.$store.commit('sudoku/setCellValue', {
        col: this.col,
        row: this.row,
        value: ' ',
      });
    }
  }

  get cellIndex(): number {
    return calculateIndexFromRowAndCol(this.row, this.col);
  }

  get cell(): SudokuCellType {
    return this.$store.state.sudoku.cells[this.cellIndex];
  }

  get displayedNotes(): string {
    return Object.keys(this.notedNumbers)
      .filter((k) => this.notedNumbers[k])
      .join(' ');
  }

  get readonly(): boolean {
    return this.$store.getters['sudoku/complete'] || this.cell.original !== ' ';
  }

  get showAsError(): boolean {
    return this.$store.getters['sudoku/duplicates'].some((cell:SudokuCellType) => cell === this.cell);
  }
}
</script>

<style>
.sudoku-cell {
  border: 1px solid rgba(0,0,0,0.15);
  width: 36px;
  height: 36px;
  justify-content: center;
  align-content: center;
  align-items: center;
  caret-color: transparent;
}
</style>
