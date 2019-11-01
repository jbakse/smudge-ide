<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="header">
        <div>
          <h1 contenteditable @input="updateTitle">{{sketch.title}}</h1>
          <button @click="saveSketch">Save Sketch</button>
          <button @click="deleteSketch">Delete Sketch</button>
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

// @todo import *
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
  }),

  watch: {
    sketchId: {
      immediate: true,
      handler(sketchId) {
        this.$bind('sketch', sketches.doc(this.sketchId));
      },
    },
  },

  methods: {
    updateTitle(e: Event) {
      const title = (e.target as Element).textContent;
      if (title == null) return;
      if (this.sketch == null) return;
      this.sketch.title = title;
    },

    saveSketch() {
      saveSketch(this.sketchId, this.sketch);
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
</style>

<style lang="scss">
</style>


