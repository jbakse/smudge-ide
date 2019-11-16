<template>
  <div ref="wrapper" class="jsview-wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  name: 'JSView',
  props: { source: { type: String, default: '' } },
  watch: {
    source: {
      handler(uid) {
        if (!this.$refs.wrapper) return;
        runJSDebounced(this.source, this.$refs.wrapper as HTMLElement);
      },
    },
  },
  mounted() {
    runJSDebounced(this.source, this.$refs.wrapper as HTMLElement);
  },
});

function readDirectives(text: string) {
  const requireRegex = /^\/\/ ?require (.*?)$/gm;
  const requires = [];
  let matchInfo = requireRegex.exec(text);
  while (matchInfo) {
    requires.push(matchInfo[1]);
    matchInfo = requireRegex.exec(text);
  }
  return { requires };
}

const runJSDebounced = _.debounce(runJS, 100);

function runJS(source: string, target: HTMLElement) {
  // directives
  const { requires } = readDirectives(source);

  const libraries = requires
    .map((require) => `<script src="${require}"><\/script>`)
    .join('\n');

  const sketchSrcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <base target="_parent">
    ${libraries}
    <style>body{margin:10px;}</style>
</head>
<body>
    <script>${source}<\/script>
</body>
</html>`;

  const sketchFrame = document.createElement('iframe');
  sketchFrame.classList.add('jsview-iframe');

  (sketchFrame as HTMLIFrameElement).srcdoc = sketchSrcDoc;
  target.innerHTML = '';
  target.appendChild(sketchFrame);
}
</script>

<style lang="scss">
@import '@/scss/_shared.scss';
.jsview-wrapper {
  background: $utility-color;
  display: flex;
}
.jsview-iframe {
  border: 0;
  width: 100%;
  border: none;
  outline: none;
}
// <iframe id="sketch-frame"></iframe>
</style>
