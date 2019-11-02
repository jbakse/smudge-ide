<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="header">
        <div>
          <h1>
            <input v-can.disable="['write', sketch]" class="inherit title" v-model="sketch.title" />
          </h1>
          <button
            v-can="['write', sketch]"
            @click="saveSketch"
            :disabled="dirty == false"
            :class="{text: dirty == false}"
          >Save Sketch</button>
          <button v-can="['write', sketch]" @click="deleteSketch" class="text">Delete Sketch</button>
        </div>
      </div>
      <div class="editor row">
        <div class="column input">
          <CodeEditor v-model="sketch.source" />
        </div>
        <JSView class="column output" :source="sketch.source"></JSView>
      </div>
    </template>
    <template v-else>
      <h1>No sketch {{sketchId}}</h1>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { user } from '@/firebase/user';
import CodeEditor from '@/components/CodeEditor.vue';
import JSView from '@/components/JSView.vue';

// @ todo hide buttons/editability if not owned

import {
  sketches,
  saveSketch,
  deleteSketch,
  Sketch,
} from '../firebase/sketches';

import 'firebase/firestore';

export default Vue.extend({
  name: 'Sketch',
  props: ['sketchId'],

  components: {
    CodeEditor,
    JSView,
  },

  data: () => ({
    sketch: {} as Sketch,
    type: 'sketch',
    dirty: false,
  }),

  computed: {},
  watch: {
    sketchId: {
      immediate: true,
      handler(sketchId) {
        this.$bind('sketch', sketches.doc(this.sketchId));
      },
    },
    sketch: {
      deep: true,
      handler(newSketch, oldSketch) {
        if (oldSketch.id === newSketch.id) {
          this.dirty = true;
        }
      },
    },
  },

  methods: {
    saveSketch() {
      saveSketch(this.sketch).then(() => {
        console.log('saved');
        this.dirty = false;
      });
    },

    deleteSketch() {
      deleteSketch(this.sketchId).then(() => {
        this.$router.replace({
          name: 'user',
          params: { username: user.username },
        });
      });
    },
  },
});

// @todo prettier/eslint file instead of airbnb?
</script>


<style scoped lang="scss">
@import '../scss/_shared.scss';

.view.sketch {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: $vertical-margin;
}

.editor {
  flex: 1;
}

.editor .column {
  position: relative;
}

.output {
  background: $utility-color;
}

input.title {
  width: 50%;
}
</style>

<style lang="scss">
</style>


