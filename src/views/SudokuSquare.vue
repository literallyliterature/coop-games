<template>
  <div style="border: 1px solid rgba(0, 0, 0, 0.7)">
    <v-row
      v-for="rowIndex in 3"
      :key="rowIndex"
      no-gutters>
      <v-col
        v-for="colIndex in 3"
        :key="colIndex">
        <SudokuCell
          :col="3 * squareCol + colIndex"
          :row="3 * squareRow + rowIndex" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SudokuCell from './SudokuCell.vue';

@Component({
  components: {
    SudokuCell,
  },

  props: {
    squareRow: {
      type: Number,
      required: true,
    },
    squareCol: {
      type: Number,
      required: true,
    },
  },
})
export default class SudokuSquare extends Vue {}
</script>
