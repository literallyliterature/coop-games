<template>
  <div style="border: 1px solid rgba(0, 0, 0, 0.7)">
    <v-row
      v-for="row in 3"
      :key="row"
      no-gutters>
      <v-col
        v-for="col in 3"
        :key="col">
        <SudokuCell />
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
})
export default class SudokuSquare extends Vue {}
</script>
