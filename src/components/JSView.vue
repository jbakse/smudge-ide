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
      immediate: true,
      handler(uid) {
        if (!this.$refs.wrapper) return;
        runJSDebounced(this.source, this.$refs.wrapper as HTMLElement);
      },
    },
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
</head>
<body>
    <script>${source}<\/script>
</body>
</html>`;

  const sketchFrame = document.createElement('iframe');
  sketchFrame.classList.add('jsview-iframe');
  // document.getElementById('sketch-frame');

  console.log('log');

  // @todo try building the iframe in js and attaching
  // https://stackoverflow.com/questions/13214419/alternatives-to-iframe-srcdoc

  (sketchFrame as HTMLIFrameElement).srcdoc = sketchSrcDoc;
  target.innerHTML = '';
  target.appendChild(sketchFrame);
}
</script>

<style lang="scss">
.jsview-wrapper {
  border: 1px dotted red;
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

