<template>
  <div
    ref="div"
    class="sudoku-cell d-flex text--secondary"
    tabindex="0"
    readonly
    style="font-size: 11px"
    :style="{
      background: readonly ? '#f4f4f4' : (
        isFocused ? '#ddf' : ''
      ),
    }"
    @focus="$emit('focused', { row: cell.row, col: cell.column })"
    @keydown.prevent="e => $emit('keyPressed', e)">
    <div
      v-if="readonly"
      style="color: #222; font-size: 20px"
      v-text="cell.correctValue" />

    <div
      v-else-if="cell.userInput !== ' '"
      :class="cell.showAsError ? 'red--text text--lighten-1' : ''"
      style="font-size: 20px"
      :style="cell.showAsError ? '' : 'color: #444'"
      v-text="cell.userInput" />

    <div
      v-else
      style="max-width: 35px; font-size: 9px"
      v-text="displayedNotes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const SudokuCellPropsAndMutations = Vue.extend({
  props: {
    cell: {
      type: Object,
      required: true,
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
    isGameComplete: {
      type: Boolean,
      default: false,
    },
  },
});

@Component({
})
export default class SudokuCell extends SudokuCellPropsAndMutations {
  focus(): void {
    // eslint-disable-next-line
    // @ts-ignore
    if (this.$refs.div?.focus) this.$refs.div.focus();
  }

  get displayedNotes(): string {
    return Object.keys(this.cell.notedNumbers)
      .filter((k) => this.cell.notedNumbers[k])
      .join(' ');
  }

  get readonly(): boolean {
    return this.isGameComplete || this.cell.original !== ' ';
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
