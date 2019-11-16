<template>
  <codemirror
    v-bind:value="value"
    v-on:input="emit"
    :options="cmOptions"
  ></codemirror>
</template>

<script lang="ts">
import Vue from 'vue';

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/base16-light.css';
// import 'codemirror/addon/scroll/simplescrollbars.js';
// import 'codemirror/addon/scroll/simplescrollbars.css';

export default Vue.extend({
  name: 'CodeEditor',

  props: { value: { type: String, default: '', required: true } },

  components: {
    codemirror,
  },

  data: () => ({
    cmOptions: {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'base16-light',
      lineNumbers: true,
      line: true,
      //   scrollbarStyle: 'overlay',
    },
  }),

  methods: {
    emit($event: any) {
      this.$emit('input', $event);
    },
  },
});
</script>

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
