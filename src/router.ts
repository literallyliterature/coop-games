import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Sudoku from './views/Sudoku.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Sudoku',
    component: Sudoku,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
