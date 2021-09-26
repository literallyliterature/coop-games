<template>
  <div
    class="sudoku-cell d-flex text--secondary"
    contenteditable
    readonly
    style="font-size: 11px"
    @keydown.prevent="keyPressed">
    <div
      style="max-width: 35px"
      v-text="displayedNotes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class SudokuCell extends Vue {
  notedNumbers: { [key: string]: boolean } = {};

  keyPressed(e: { key: string }): void {
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const deleteKeys = ['Backspace', 'Delete'];
    const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Tab'];

    const { key } = e;

    if (numberKeys.includes(key)) Vue.set(this.notedNumbers, key, !this.notedNumbers[key]);
    if (deleteKeys.includes(key)) this.notedNumbers = {};
    else if (arrowKeys.includes(key)) this.$emit(key);
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
