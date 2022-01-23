<template>
  <div
    ref="div"
    class="sudoku-cell d-flex"
    tabindex="0"
    readonly
    style="font-size: 11px"
    :style="{
      background: backgroundColour,
    }"
    @focus="$emit('focused', { row: cell.row, col: cell.column })"
    @keydown.prevent="e => $emit('keyPressed', e)">
    <div
      v-if="cell.original !== ' '"
      style="color: #cacaca; font-size: 20px"
      v-text="cell.correctValue" />

    <div
      v-else-if="cell.userInput !== ' '"
      :class="mistake ? 'error--text' : ''"
      style="font-size: 20px"
      :style="mistake ? '' : 'color: #dadada'"
      v-text="cell.userInput" />

    <div
      v-else
      class="font-weight-bold"
      style="max-width: 35px; font-size: 9px; color: #c2c2c2"
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
    mistake: {
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

  get backgroundColour(): string {
    if (this.isGameComplete) {
      return (this.cell.original === ' ') ? '#474747' : '#343434';
    }

    if (this.readonly) return this.isFocused ? '#34345f' : '#343434';

    return this.isFocused ? '#48486f' : '#474747';
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
  touch-action: manipulation;
  align-content: center;
  align-items: center;
  caret-color: transparent;
}
.sudoku-cell:focus {
  outline: none !important;
}
</style>
