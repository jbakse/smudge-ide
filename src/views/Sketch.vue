<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="columns">
        <div class="column">
          <h1 contenteditable @input="updateTitle" @blur="saveSketch">{{sketch.title}}</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column input">
          <codemirror v-model="sketch.content" :options="cmOptions"></codemirror>
          <button @click="saveSketch">Save Sketch</button>
        </div>
        <div class="column output">output</div>
      </div>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/base16-dark.css';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore();

type Sketch = {
  id: string;
  title: string;
  content: string;
} | null;

export default Vue.extend({
  name: 'Sketch',
  props: ['userID', 'sketchID'],
  components: {
    codemirror,
  },
  data: () => ({
    sketch: null as Sketch,
    cmOptions: {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'base16-dark',
      lineNumbers: true,
      line: true,
    },
  }),

  watch: {
    sketchID: {
      immediate: true,
      handler(sketchID) {
        console.log(this.userID, this.sketchID);
        this.$bind(
          'sketch',
          db
            .collection('profiles')
            .doc(this.userID)
            .collection('sketches')
            .doc(this.sketchID)
        );
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
      db.collection('profiles')
        .doc(this.userID)
        .collection('sketches')
        .doc(this.sketchID)
        .update({ title: this.sketch.title, content: this.sketch.content });
    },
  },
});
</script>


<style scoped lang="scss">
.vue-codemirror {
  margin-bottom: 10px;
}
.input {
}
.output {
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>


