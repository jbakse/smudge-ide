<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="header row">
        <div class="column">
          <h1 contenteditable @input="updateTitle">{{sketch.title}}</h1>
          <button @click="saveSketch">Save Sketch</button>
          <button @click="deleteSketch">Delete Sketch</button>
        </div>
      </div>
      <div class="editor row">
        <div class="column input">
          <codemirror v-model="sketch.source" :options="cmOptions"></codemirror>
        </div>

        <JSView class="column output" :source="sketch.source"></JSView>
      </div>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import user from '../user';
import JSView from '@/components/JSView.vue';

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/base16-light.css';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore();
const sketches = db.collection('sketches');

type Sketch = {
  id: string;
  title: string;
  source: string;
} | null;

export default Vue.extend({
  name: 'Sketch',
  props: ['sketchId'],

  components: {
    codemirror,
    JSView,
  },

  data: () => ({
    sketch: {} as Sketch,
    cmOptions: {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'base16-light',
      lineNumbers: true,
      line: true,
    },
  }),

  watch: {
    sketchID: {
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
      if (this.sketch == null) return;
      sketches
        .doc(this.sketchId)
        .update({ title: this.sketch.title, source: this.sketch.source });
    },

    deleteSketch() {
      if (this.sketch == null) return;
      sketches.doc(this.sketchId).delete();
      this.$router.replace({
        name: 'user',
        params: { username: user.username },
      });
    },
  },
});
</script>


<style scoped lang="scss">
@import '../scss/_shared.scss';

.sketch {
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
.CodeMirror {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
}
</style>


