<template>
  <div class="view sketch">
    <template v-if="sketch">
      <h1>{{sketch.title}}</h1>
      Sketch Id: {{id}}
      <br />Content:
      <br />
      <textarea v-model="sketch.content"></textarea>
      <br />
      <button @click="saveContent">Save Sketch</button>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore();

export default Vue.extend({
  name: 'Sketch',
  props: ['uid', 'id'],

  data: () => ({
    sketch: null,
  }),

  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$bind(
          'sketch',
          db
            .collection('profiles')
            .doc(this.uid)
            .collection('sketches')
            .doc(this.id)
        );
      },
    },
  },

  methods: {
    saveContent() {
      console.log('Save Content', this.sketch.content);
      db.collection('profiles')
        .doc(this.uid)
        .collection('sketches')
        .doc(this.id)
        .update({ content: this.sketch.content });
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


