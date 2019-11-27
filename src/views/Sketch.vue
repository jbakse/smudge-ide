<template>
  <ValidationObserver v-if="sketch" ref="observer" v-slot="{ invalid, dirty }" class="sketch">
    <div class="header">
      <h1 class="title">
        <VeeInputAuto
          :disabled="!$can('write', sketch)"
          label="title"
          vid="title"
          rules="required|max:60|min:4"
          v-model="sketch.title"
        />

        <!-- <VeeInput
          :disabled="!$can('write', sketch)"
          label="title"
          vid="title"
          rules="required|max:60|min:4"
          v-model="sketch.title"
        />-->
      </h1>

      <div class="owner-username">
        by
        <router-link
          class="simple"
          :to="{ name: 'user', params: { username: sketch.ownerUsername } }"
        >{{ sketch.ownerUsername }}</router-link>
      </div>

      <!-- <button
        v-if="$can('write', sketch)"
        :class="{ invalid }"
        :disabled="!dirty || invalid"
        @click="saveSketch"
      >Save Sketch</button>-->

      <div class="buttons">
        <button
          v-if="$can('write', sketch)"
          :class="{ invalid }"
          :disabled="!dirty || invalid"
          @click="saveSketch"
        >Save Sketch</button>
        <button v-if="$can('write', sketch)" @click="deleteSketch" class="right text">Delete Sketch</button>
      </div>
    </div>
    <div class="editor row">
      <div class="column input">
        <ValidationProvider name="source" rules="max:33088" v-slot="{ errors, classes }">
          <ValidationErrors :errors="errors" />
          <div class="editor-wrap">
            <CodeEditor v-model="sketch.source" />
          </div>
        </ValidationProvider>
      </div>
      <JSView class="column output" :source="sketch.source"></JSView>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import * as auth from '@/firebase/auth';
import * as sketches from '@/firebase/sketches';
import * as snackbar from '@/snackbar';
import CodeEditor from '@/components/CodeEditor.vue';
import JSView from '@/components/JSView.vue';

import 'firebase/firestore';

export default Vue.extend({
  name: 'Sketch',

  props: ['sketchId'],

  components: {
    CodeEditor,
    JSView,
  },

  data: () => ({
    sketch: null as sketches.Sketch | null,
    type: 'sketch',
  }),

  watch: {
    sketchID: {
      immediate: true,
      handler() {
        this.$bind('sketch', sketches.sketches.doc(this.sketchId), {
          wait: true,
        }).then();
      },
    },
  },

  methods: {
    async saveSketch() {
      if (!this.sketch) return;
      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }

      sketches.saveSketch(this.sketch).then(() => {
        // @todo make; this; a; shared; func ?
        requestAnimationFrame(() => {
          (this.$refs.observer as any).reset();
        });

        snackbar.show('Sketch Saved!');
      });
    },

    deleteSketch() {
      if (!this.sketch) return;
      sketches.deleteSketch(this.sketch).then(() => {
        this.$router.replace({
          name: 'user',
          params: { username: auth.user.username },
        });
      });
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/scss/_shared.scss';

.sketch {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: $vertical-margin;
}

.header {
  margin-bottom: $vertical-margin;
}

.title {
  width: 50%;
  margin: 0;
}

.buttons {
  margin-top: $vertical-margin;
  position: relative;
}

.buttons .right {
  float: right;
}

.editor {
  flex: 1;
}

.editor .column {
  position: relative;
}

.editor-wrap {
  position: relative;
  height: 100%;
}
</style>
