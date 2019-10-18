<template>
  <div class="view sketch">
    <template v-if="sketch">
      <h1>Sketch</h1>
      <h2>id: {{id}}</h2>
      title: {{sketch.title}}
      content: {{sketch.content}}
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

  methods: {},
});
</script>


<style scoped lang="scss">
</style>


