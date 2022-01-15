<template>
  <v-row align="center" align-content="center" dense justify="space-between">
    <v-col cols="auto" style="max-width: 120px">
      <v-row dense justify="center">
        <v-col
          v-for="(arrowItem, index) in arrowItems"
          :key="index"
          cols="auto">
          <v-btn @click="action(arrowItem.actionStr)" icon small>
            <v-icon>{{ arrowItem.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="auto" style="max-width: 50px">
      <v-row justify="center" dense>
        <v-col>
          <v-btn
            @click="$emit('update:in-notes-mode', !inNotesMode)"
            :color="inNotesMode ? 'primary' : ''"
            icon>
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <v-btn @click="action('del')" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <v-menu
            v-model="showingMenu"
            bottom
            :close-on-content-click="false"
            offset-y
            @input="resetSaveInput">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>

            <v-card min-width="150px">
              <div
                v-if="!showNewSaveInput"
                class="text-left pa-4"
                :class="savedStates.length ? 'pb-0' : ''">
                <a
                  class="text-body-2"
                  @click="showNewSaveInput = true">
                  Save current state
                </a>
              </div>
              <v-form
                v-else
                class="pa-2 pl-4 pb-4"
                @submit.prevent="saveState">
                <v-text-field
                  autofocus
                  hide-details
                  label="Save state as"
                  @blur="saveState"
                  v-model="newSaveStateLabel" />
              </v-form>

              <v-list v-if="savedStates.length">
                <v-list-item
                  v-for="(savedState, index) in savedStates"
                  :key="index">
                  {{ savedState.label }}
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="auto" style="max-width: 140px">
      <v-row dense justify="center">
        <v-col
          v-for="(numItem, index) in numItems"
          :key="index"
          cols="auto">
          <v-btn @click="action(numItem.actionStr)" icon outlined>
            <v-icon>{{ numItem.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface iconAndAction {
  icon: string,
  actionStr: string,
}

const SudokuControlsPropsAndMutations = Vue.extend({
  props: {
    inNotesMode: {
      type: Boolean,
      default: false,
    },
    savedStates: {
      type: Array,
      default: () => [],
    },
  },
});

@Component({})
export default class SudokuControls extends SudokuControlsPropsAndMutations {
  arrowItems: iconAndAction[] = [
    { icon: 'mdi-arrow-top-left', actionStr: 'up-left' },
    { icon: 'mdi-arrow-up', actionStr: 'up' },
    { icon: 'mdi-arrow-top-right', actionStr: 'up-right' },
    { icon: 'mdi-arrow-left', actionStr: 'left' },
    { icon: 'mdi-image-filter-center-focus', actionStr: 'focus-center' },
    { icon: 'mdi-arrow-right', actionStr: 'right' },
    { icon: 'mdi-arrow-bottom-left', actionStr: 'down-left' },
    { icon: 'mdi-arrow-down', actionStr: 'down' },
    { icon: 'mdi-arrow-bottom-right', actionStr: 'down-right' },
  ];

  numItems: iconAndAction[] = [
    { icon: 'mdi-numeric-1', actionStr: '1' },
    { icon: 'mdi-numeric-2', actionStr: '2' },
    { icon: 'mdi-numeric-3', actionStr: '3' },
    { icon: 'mdi-numeric-4', actionStr: '4' },
    { icon: 'mdi-numeric-5', actionStr: '5' },
    { icon: 'mdi-numeric-6', actionStr: '6' },
    { icon: 'mdi-numeric-7', actionStr: '7' },
    { icon: 'mdi-numeric-8', actionStr: '8' },
    { icon: 'mdi-numeric-9', actionStr: '9' },
  ];

  showNewSaveInput = false;

  showingMenu = false;

  newSaveStateLabel = '';

  action(actionStr: string): void {
    this.$emit('action', actionStr);
  }

  resetSaveInput(): void {
    this.showNewSaveInput = false;
    this.newSaveStateLabel = '';
  }

  saveState(): void {
    this.$emit('save-state', this.newSaveStateLabel);
    this.resetSaveInput();
    this.showingMenu = false;
  }
}
</script>
