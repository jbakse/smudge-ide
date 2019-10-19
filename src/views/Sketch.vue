<template>
  <div class="view sketch">
    <template v-if="sketch">
      <h1 contenteditable @input="updateTitle" @blur="saveSketch">{{sketch.title}}</h1>
      Sketch Id: {{sketchID}}
      <br />Content:
      <br />
      <textarea v-model="sketch.content"></textarea>
      <br />
      <button @click="saveSketch">Save Sketch</button>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';

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

  data: () => ({
    sketch: null as Sketch,
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
  padding: 5px;
}

textarea {
  border: none;
  border-left: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
  width: 50%;
  height: 400px;
}
</style>


