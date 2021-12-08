<template>
  <v-row justify="center" no-gutters>
    <v-col cols="auto" style="border: 1px solid rgba(0, 0, 0, 0.2)">
      <v-row
        v-for="squareRow in 3"
        :key="squareRow"
        no-gutters>
        <v-col
          v-for="squareCol in 3"
          :key="squareCol"
          cols="auto"
          no-gutters>
          <SudokuSquare
            :square-col="squareCol - 1"
            :square-row="squareRow - 1" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SudokuSquare from './SudokuSquare.vue';

@Component({
  components: {
    SudokuSquare,
  },

  created() {
    this.$store.commit('sudoku/initialiseGame');
  },
})
export default class Sudoku extends Vue {}
</script>
