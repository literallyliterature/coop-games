import Vue from 'vue';
import Vuex from 'vuex';

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
      },
      state: () => ({
        focusedCell: {
          row: -1,
          col: -1,
        },
        gameString: '',
        originalInputsString: '',
        userInputsString: '',
      }),
    },
  },
});
