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
      </h1>

      <div class="owner-username">
        by
        <router-link
          class="simple"
          :to="{ name: 'user', params: { username: sketch.ownerUsername } }"
        >{{ sketch.ownerUsername }}</router-link>
      </div>
      <div class="forked-from" v-for="sketch in forkedFrom" v-bind:key="sketch.id">
        forked from
        <router-link
          class="simple"
          :to="{ name: 'sketch', params: { sketchId: sketch.id } }"
        >{{ sketch.title }}</router-link>&nbsp;by
        <router-link
          class="simple"
          :to="{ name: 'user', params: { username: sketch.ownerUsername } }"
        >{{ sketch.ownerUsername }}</router-link>

        <!-- <router-link
          class="simple"
          :to="{ name: 'user', params: { username: sketch.ownerUsername } }"
        >{{ sketch.ownerUsername }}</router-link>-->
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

        <!-- <button v-if="hasLocalEdits" @click="revertLocalSource">Revert Sketch</button> -->
        <button v-if="user.loggedIn" @click="forkSketch">Fork Sketch</button>

        <button v-if="$can('write', sketch)" @click="deleteSketch" class="right text">Delete Sketch</button>
        <button v-if="hasLocalEdits" @click="revertLocalSource" class="right text">Revert Sketch</button>
      </div>

      <div v-if="hasLocalEdits" class="local-edit-message">
        <span v-if="!user.loggedIn">Log in to save local changes.</span>
        <span v-else>This sketch has local changes.</span>
        <!-- <span class="link" @click="revertLocalSource">revert</span> -->
      </div>
      <div v-else class="local-edit-message">&nbsp;</div>
      <!-- {{hasLocalCache}} -->
    </div>
    <div class="editor row">
      <div class="column input">
        <ValidationProvider name="source" rules="max:33088" v-slot="{ errors, classes }">
          <ValidationErrors :errors="errors" />
          <div class="editor-wrap">
            <CodeEditor v-model="localSource" @input="onSourceInput" />
          </div>
        </ValidationProvider>
      </div>
      <!-- <pre>{{sketch.source}}</pre> -->
      <JSView class="column output" :source="localSource"></JSView>
    </div>
  </ValidationObserver>
  <h1 v-else>Sketch not found.</h1>
</template>

<script lang="ts">
import Vue from 'vue';
import * as auth from '@/firebase/auth';
import * as sketches from '@/firebase/sketches';
import * as snackbar from '@/snackbar';
import CodeEditor from '@/components/CodeEditor.vue';
import JSView from '@/components/JSView.vue';

import 'firebase/firestore';

const storage = sessionStorage;

export default Vue.extend({
  name: 'Sketch',

  props: ['sketchId'],

  components: {
    CodeEditor,
    JSView,
  },

  data: () => ({
    sketch: null as sketches.Sketch | null,
    localSource: '',
    type: 'sketch',
    user: auth.user,
    // hasLocalCache: false,
  }),

  // mounted() {
  //   setInterval(() => {
  //     this.hasLocalCache =
  //       !!storage.getItem(this.sketchId) + ' ' + this.sketchId;
  //   }, 400);
  // },

  watch: {
    sketchId: {
      immediate: true,
      handler() {
        console.log('watch sketch id', this.sketchId);
        this.$bind('sketch', sketches.sketches.doc(this.sketchId), {
          wait: true,
        }).then((i) => {
          if (i && i.id !== this.sketchId) {
            this.$unbind('sketch');
          }
        });
      },
    },
    'sketch.source': {
      handler(sketchSource) {
        console.log('watch sketch source', this.sketchId);
        const localSource = storage.getItem(this.sketchId);
        if (localSource) {
          this.localSource = localSource;
        } else {
          this.localSource = sketchSource;
        }
      },
    },
  },

  computed: {
    forkedFrom(): any[] {
      if (!this.sketch) return [];
      const forkedFrom = this.sketch.forkedFrom;
      if (!forkedFrom || !forkedFrom.length) {
        return [];
      }
      return [forkedFrom.slice().reverse()[0]];
    },

    hasLocalEdits(): boolean {
      if (!this.sketch) return false;
      return this.localSource !== this.sketch.source;
    },
  },

  methods: {
    async onSourceInput() {
      console.log('source input');
      if (!this.sketch) return;
      if (this.localSource !== this.sketch.source) {
        this.storeLocalSource();
      }
    },

    async storeLocalSource() {
      console.log('store local source');
      if (!this.sketch) return;
      storage.setItem(this.sketchId, this.localSource);
    },

    async revertLocalSource() {
      console.log('revert local source', this.sketchId);
      if (!this.sketch) return;
      storage.removeItem(this.sketchId);
      this.localSource = this.sketch.source;
      this.resetForm();
      snackbar.show('Sketch Reverted');
    },

    async saveSketch() {
      console.log('save sketch');
      if (!this.sketch) return;

      // @todo move this to sketches.saveSketch? probably, placing
      // that check close to saving means everything always does it
      if (!(this as any).$can('write', this.sketch)) {
        console.error('user not authorized to save');
        return;
      }

      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }

      storage.removeItem(this.sketchId);
      this.sketch.source = this.localSource;

      sketches.saveSketch(this.sketch).then(() => {
        this.resetForm();
        snackbar.show('Sketch Saved');
      });
    },

    async forkSketch() {
      console.log('fork sketch');

      if (!this.sketch) return;

      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }

      storage.removeItem(this.sketchId);
      this.sketch.source = this.localSource;

      sketches
        .forkSketch(this.sketch)
        .then((docRef) => {
          this.$router.push({
            name: 'sketch',
            params: { sketchId: docRef.id },
          });
          this.resetForm();
          snackbar.show('Sketch Forked');
        })
        .catch((err) => {
          console.log('error forking sketch outer', err);
        });
    },

    deleteSketch() {
      if (!this.sketch) return;
      storage.removeItem(this.sketchId);
      sketches.deleteSketch(this.sketch).then(() => {
        this.$router.replace({
          name: 'user',
          params: { username: auth.user.username },
        });
      });
    },

    resetForm() {
      requestAnimationFrame(() => {
        (this.$refs.observer as any).reset();
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

.local-edit-message {
  font-size: 10px;
}

.link {
  color: $accent-color;
  cursor: pointer;
  text-decoration: underline;
}
</style>
