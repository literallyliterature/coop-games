<template>
  <div
    ref="div"
    class="sudoku-cell d-flex text--secondary"
    contenteditable
    readonly
    style="font-size: 11px"
    @focus="focusCell({ row, col })"
    @keydown.prevent="keyPressed">
    <div
      style="max-width: 35px"
      v-text="displayedNotes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations, mapState } from 'vuex';

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

  keyPressed(e: { key: string }): void {
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const deleteKeys = ['Backspace', 'Delete'];
    const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

    const { key } = e;

    if (numberKeys.includes(key)) Vue.set(this.notedNumbers, key, !this.notedNumbers[key]);
    if (deleteKeys.includes(key)) this.notedNumbers = {};
    else if (arrowKeys.includes(key)) {
      if (key === 'ArrowLeft') this.focusCell({ row: this.row, col: this.col - 1 });
      else if (key === 'ArrowRight') this.focusCell({ row: this.row, col: this.col + 1 });
      else if (key === 'ArrowUp') this.focusCell({ row: this.row - 1, col: this.col });
      else if (key === 'ArrowDown') this.focusCell({ row: this.row + 1, col: this.col });
    }
  }

  get displayedNotes(): string {
    return Object.keys(this.notedNumbers)
      .filter((k) => this.notedNumbers[k])
      .join(' ');
  }
}
</script>

<style>
.sudoku-cell {
  border: 1px solid rgba(0,0,0,0.15);
  width: 50px;
  font-size: 9px;
  height: 50px;
  justify-content: center;
  align-content: center;
  align-items: center;
  caret-color: transparent;
}
</style>
