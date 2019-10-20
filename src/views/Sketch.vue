<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="header columns">
        <div class="column">
          <h1 contenteditable @input="updateTitle" @blur="saveSketch">{{sketch.title}}</h1>
          <button @click="saveSketch">Save Sketch</button>
        </div>
      </div>
      <div class="editor columns">
        <div class="column input">
          <codemirror v-model="sketch.content" :options="cmOptions"></codemirror>
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
import 'codemirror/theme/base16-light.css';

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
      theme: 'base16-light',
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
.sketch {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 15px;
}
.editor {
  flex: 1;
}

.editor .column {
  position: relative;
  flex: 1 1;
}

.output {
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
}

.vue-codemirror {
  margin-bottom: 10px;
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


