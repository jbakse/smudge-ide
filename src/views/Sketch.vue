<template>
  <div class="view sketch">
    <template v-if="sketch.id">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid, dirty }"
        class="observer"
      >
        <div class="header">
          <h1>
            <VeeInput
              :disabled="!$can('write', sketch)"
              label="title"
              vid="title"
              rules="required|max:60|min:4"
              v-model="sketch.title"
            />
          </h1>

          <div v-if="!$can('write', sketch)" class="owner-username">
            by
            <router-link
              class="simple"
              :to="{ name: 'user', params: { username: sketch.ownerUsername } }"
              >{{ sketch.ownerUsername }}</router-link
            >
          </div>

          <button
            v-if="$can('write', sketch)"
            :class="{ invalid }"
            :disabled="!dirty || invalid"
            @click="saveSketch"
          >
            Save Sketch
          </button>

          <button v-can="['write', sketch]" @click="deleteSketch" class="text">
            Delete Sketch
          </button>
        </div>
        <div class="editor row">
          <div class="column input">
            <ValidationProvider
              name="source"
              rules="max:33088"
              v-slot="{ errors, classes }"
            >
              <ValidationErrors :errors="errors" />
              <div class="wrap">
                <CodeEditor v-model="sketch.source" />
              </div>
            </ValidationProvider>
          </div>
          <JSView class="column output" :source="sketch.source"></JSView>
        </div>
      </ValidationObserver>
    </template>
  </div>
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
    sketch: {} as sketches.Sketch,
    type: 'sketch',
  }),

  computed: {},

  watch: {
    // watch for timestamp updates (we reset data from DB) and clear the dirty state
    'sketch.updated': {
      handler(timestamp) {
        // setTimeout(() => (this.$refs.observer as any).reset(), 0);
      },
    },

    sketchId: {
      immediate: true,
      handler(sketchId) {
        this.$bind('sketch', sketches.sketches.doc(this.sketchId), {
          wait: true,
        }).then();
      },
    },
  },

  methods: {
    async saveSketch() {
      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }
      sketches.saveSketch(this.sketch).then(() => {
        console.log('saved');
        requestAnimationFrame(() => {
          (this.$refs.observer as any).reset();
        });

        snackbar.show('Sketch Saved!');
      });
    },

    deleteSketch() {
      sketches.deleteSketch(this.sketchId).then(() => {
        this.$router.replace({
          name: 'user',
          params: { username: auth.user.username },
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

.observer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.wrap {
  position: relative;
  height: 100%;
}
</style>
