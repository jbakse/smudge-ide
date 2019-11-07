<template>
  <div class="view sketch">
    <template v-if="sketch">
      <div class="header">
        <ValidationObserver ref="observer" v-slot="{ pristine, invalid }">
          <h1>
            <VeeInput
              :disabled="!$can('write', sketch)"
              label="title"
              vid="title"
              rules="max:60|min:4"
              v-model="sketch.title"
            />
          </h1>
          <div class="inline-block" v-can="['write', sketch]">
            <button
              :class="{text: pristine || invalid}"
              :disabled="pristine || invalid"
              @click="saveSketch"
            >Save Sketch</button>
          </div>
          <button v-can="['write', sketch]" @click="deleteSketch" class="text">Delete Sketch</button>
        </ValidationObserver>
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
import { auth } from '@/firebase/auth';
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
  }),

  computed: {},
  watch: {
    sketchId: {
      immediate: true,
      handler(sketchId) {
        this.$bind('sketch', sketches.doc(this.sketchId));
      },
    },
  },

  methods: {
    saveSketch() {
      saveSketch(this.sketch).then(() => {
        console.log('saved');
        requestAnimationFrame(() => {
          (this.$refs.observer as any).reset();
        });
      });
    },

    deleteSketch() {
      deleteSketch(this.sketchId).then(() => {
        this.$router.replace({
          name: 'user',
          params: { username: auth.username },
        });
      });
    },
  },
});

// @todo prettier/eslint file instead of airbnb?
</script>


<style scoped lang="scss">
@import '@/scss/_shared.scss';

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


